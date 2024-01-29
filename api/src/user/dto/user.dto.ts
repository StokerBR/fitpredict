import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UserDto {
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

  @IsInt()
  @IsNotEmpty()
  @Min(100)
  @Max(300)
  @ApiProperty({
    description: 'Altura do Usuário (cm)',
    type: 'int',
    example: 180,
    minimum: 100,
    maximum: 300,
    required: true,
  })
  height: number;

  @IsInt()
  @IsNotEmpty()
  @Min(30)
  @Max(300)
  @ApiProperty({
    description: 'Peso do Usuário (kg)',
    type: 'int',
    example: 80,
    minimum: 30,
    maximum: 300,
    required: true,
  })
  weight: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @ApiProperty({
    description: 'Total de passos do Usuário',
    type: 'int',
    example: 1000,
    minimum: 0,
    required: false,
  })
  totalSteps: number;

  @IsDateString({ strict: true })
  @IsOptional()
  @ApiProperty({
    description: 'Data da última sincronização',
    type: 'date',
    example: '2024-01-22 12:30:00',
    format: 'YYYY-MM-DD HH:mm:ss',
    required: false,
  })
  lastSync: string;
}
