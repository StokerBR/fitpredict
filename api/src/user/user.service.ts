import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cadastrar um novo usuário
   * @param RegisterUserDto
   * @returns User
   */
  async register(registerUserDto: RegisterUserDto) {
    // Verificar se o email já existe
    if (await this.emailExists(registerUserDto.email)) {
      throw new HttpException(
        'O Email especificado já está em uso.',
        HttpStatus.FORBIDDEN,
      );
    }

    // Criptografar a senha
    const hash = await bcrypt.hash(registerUserDto.password, 10);

    // Substituir a senha do DTO pelo hash
    registerUserDto = { ...registerUserDto, password: hash };

    try {
      // Cadastrar o usuário
      const user = await this.prisma.user.create({
        data: registerUserDto,
        select: {
          id: true,
        },
      });

      user['message'] = 'Usuário cadastrado com sucesso.';

      return user;
    } catch (error) {
      throw new HttpException(
        'Falha ao cadastrar usuário. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obter os dados de um usuário pelo ID
   * @param id number
   * @returns object
   */
  getUser(req: any) {
    const user: User = req.user;
    return this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        height: true,
        weight: true,
        totalSteps: true,
        lastSync: true,
      },
    });
  }

  /**
   * Atualiza os dados de um usuário
   * @param updateUserDto
   * @returns
   */
  async update(req: any, updateUserDto: Partial<UpdateUserDto>) {
    const user: User = req.user;
    try {
      // Atualiza os dados da avaliação
      await this.prisma.user.update({
        where: { id: user.id },
        data: { ...updateUserDto, lastSync: new Date() },
      });
      return { message: 'Usuário atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        'Falha ao atualizar dados do usuário. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // --------------------------------------------------

  // Verifica se o email já existe
  private async emailExists(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return !!user;
  }
}
