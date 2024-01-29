import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { StatDto } from 'src/stat/dto/stat.dto';
import { ApiProperty } from '@nestjs/swagger';
import { SyncGoalDto } from 'src/goal/dto/sync-goal.dto';

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
