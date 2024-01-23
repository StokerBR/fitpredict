import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { GoalDto } from 'src/goal/dto/goal.dto';
import { StatDto } from 'src/stat/dto/stat.dto';

export class SyncDto {
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoalDto)
  goals: GoalDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatDto)
  stats: StatDto[];
}
