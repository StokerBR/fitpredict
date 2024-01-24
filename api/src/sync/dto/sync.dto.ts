import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { GoalDto } from 'src/goal/dto/goal.dto';
import { StatDto } from 'src/stat/dto/stat.dto';
import { ApiProperty } from '@nestjs/swagger';

class SyncGoalDto extends GoalDto {
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

export class SyncDto {
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmpty()
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyncGoalDto)
  @ApiProperty({ type: [SyncGoalDto] })
  goals: SyncGoalDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatDto)
  @ApiProperty({ type: [StatDto] })
  stats: StatDto[];
}
