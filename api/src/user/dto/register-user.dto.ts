import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Max,
  IsEnum,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  @ApiProperty({
    description: 'Nome do Usuário',
    type: 'string',
    example: 'João da Silva',
    minLength: 3,
    maxLength: 150,
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  @ApiProperty({
    description: 'Email do Usuário',
    type: 'string',
    example: 'joaodasilva@gmail.com',
    format: 'email',
    maxLength: 150,
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(150)
  @ApiProperty({
    description: 'Senha do Usuário',
    type: 'string',
    example: 'senha123',
    minLength: 6,
    maxLength: 150,
    required: true,
  })
  password: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1)
  @ApiProperty({
    description: 'Gênero do Usuário',
    type: 'string',
    example: 'M',
    minLength: 1,
    maxLength: 1,
    required: true,
  })
  gender: Gender;

  @IsNumber()
  @IsNotEmpty()
  @Min(100)
  @Max(300)
  @ApiProperty({
    description: 'Altura do Usuário',
    type: 'number',
    example: 180,
    minimum: 100,
    maximum: 300,
    required: true,
  })
  height: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(30)
  @Max(300)
  @ApiProperty({
    description: 'Peso do Usuário',
    type: 'number',
    example: 80,
    minimum: 30,
    maximum: 300,
    required: true,
  })
  weight: number;
}
