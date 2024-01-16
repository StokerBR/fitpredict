import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto, UpdateUserDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Cadastrar um novo usuário
  @Post('register')
  @ApiCreatedResponse({
    // Documentação da resposta pro swagger
    description: 'Cadastro realizado com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            message: 'Usuário cadastrado com sucesso.',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description: 'Caso o email e/ou CPF já estiverem em uso',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'O Email/CPF especificado já está em uso.',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao cadastrar o usuário',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível cadastrar o usuário. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  // Obter os dados do usuário logado
  @Get('')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('User access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Dados do usuário obtidos com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            name: 'João da Silva',
            email: 'joaodasilva@gmail.com',
            cpf: '69796737000',
          },
        },
      },
    },
  })
  getUser(@Request() req: any) {
    return this.userService.getUser(req);
  }

  // Editar dados do usuário
  @Put('')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('User access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Dados atualizados com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            message: 'Usuário atualizado com sucesso.',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description: 'Caso o email/CPF já estiverem em uso',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'O Email/CPF especificado já está em uso.',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao atualizar dados do usuário',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível atualizar dados do usuário. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto);
  }
}
