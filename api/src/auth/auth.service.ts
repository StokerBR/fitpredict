import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtUserPayload } from './auth.types';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  /**
   * Valida o usuário
   * @param email string
   * @returns
   */
  async validateUser(
    userId: number,
  ): Promise<
    Omit<
      User,
      | 'password'
      | 'gender'
      | 'height'
      | 'weight'
      | 'totalSteps'
      | 'lastSync'
      | 'createdAt'
      | 'updatedAt'
    >
  > {
    const user = await this.userService.getUser({ user: { id: userId } });
    if (user) {
      return user;
    }
    return null;
  }

  /**
   * Gera o token de acesso e o token de refresh
   * @param payload
   * @returns
   */
  private generateToken(payload: JwtUserPayload) {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: jwtConstants.secret,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: jwtConstants.secretRefresh,
      }),
    };
  }

  /**
   * Valida o token de refresh
   * @param type
   * @param body
   * @returns
   */
  private async validateRefreshToken(refreshToken: string) {
    const id = this.jwtService.decode(refreshToken)['id'];
    const user = await this.validateUser(id);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: jwtConstants.secretRefresh,
      });
      return user;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }

  /**
   * Realiza o login do usuário
   * @param data LoginDto
   * @returns access_token
   */
  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtUserPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      return this.generateToken(payload);
    } else {
      throw new UnauthorizedException(
        'Verifique as credenciais e tente novamente',
      );
    }
  }

  /**
   * Realiza o refresh do token de acesso
   * @param refresh_token
   * @returns
   */
  async refresh(refresh_token: string) {
    const user = await this.validateRefreshToken(refresh_token);
    const payload: JwtUserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return this.generateToken(payload);
  }
}
