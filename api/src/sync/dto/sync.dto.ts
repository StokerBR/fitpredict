import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { GoalDto } from 'src/goal/dto/goal.dto';
import { StatDto } from 'src/stat/dto/stat.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SyncDto {
  @ValidateNested()
  @Type(() => UserDto)
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoalDto)
  @ApiProperty({ type: [GoalDto] })
  goals: GoalDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatDto)
  @ApiProperty({ type: [StatDto] })
  stats: StatDto[];
}
