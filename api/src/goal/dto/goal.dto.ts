import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';

export class GoalDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'ID da Meta',
    type: 'int',
    example: 1,
    required: false,
  })
  id: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Passos da Meta',
    type: 'int',
    example: 1000,
    minimum: 0,
    required: true,
  })
  steps: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Distância da Meta (m)',
    type: 'int',
    example: 750,
    minimum: 0,
    required: true,
  })
  distance: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Calorias da Meta (kcal)',
    type: 'int',
    example: 50,
    minimum: 0,
    required: true,
  })
  calories: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Passos dados',
    type: 'int',
    example: 100,
    minimum: 0,
    required: true,
  })
  stepsWalked: number;

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

  @IsDateString({ strict: true })
  @IsOptional()
  @ApiProperty({
    description: 'Data de conclusão da meta',
    type: 'date',
    example: '2024-01-22 12:30:00',
    format: 'YYYY-MM-DD HH:mm:ss',
    required: false,
  })
  completedAt: string;
}
