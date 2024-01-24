import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { UserDto } from './user.dto';

export class RegisterUserDto extends UserDto {
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
}
