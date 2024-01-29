import { GoalDto } from './goal.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsBoolean } from 'class-validator';

export class SyncGoalDto extends GoalDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'ID da Meta',
    type: 'int',
    example: 1,
    required: false,
  })
  id: number;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Indica se a meta foi deletada no app',
    type: 'boolean',
    example: false,
    required: false,
  })
  deleted: boolean;
}
