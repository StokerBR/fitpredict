import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SyncModule } from './sync/sync.module';
import { GoalModule } from './goal/goal.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, SyncModule, GoalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
