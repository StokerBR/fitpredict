import { GoalDto } from './goal.dto';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGoalDto extends GoalDto {
  @IsInt()
  @ApiProperty({
    description: 'ID da Meta',
    type: 'int',
    example: 1,
    required: false,
  })
  id: number;
}
