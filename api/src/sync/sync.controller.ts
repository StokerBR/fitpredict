import { Body, Controller, Post } from '@nestjs/common';
import { SyncService } from './sync.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SyncDto } from './dto/sync.dto';

@ApiTags('Synchronization')
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  // Sincroniza os dados com o app
  @Post('register')
  register(@Body() syncDto: SyncDto) {
    return this.syncService.sync(syncDto);
  }
}
