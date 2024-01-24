import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';

export class StatDto {
  @IsDateString({ strict: true })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Data da Estatística',
    type: 'string',
    example: '2024-01-22',
    format: 'YYYY-MM-DD',
    required: true,
  })
  date: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Passos dados no dia',
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
    description: 'Distância percorrida no dia (m)',
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
    description: 'Calorias gastas no dia (kcal)',
    type: 'int',
    example: 50,
    minimum: 0,
    required: true,
  })
  calories: number;

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
