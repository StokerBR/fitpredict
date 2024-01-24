import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SyncDto } from './dto/sync.dto';
import * as fs from 'fs';

@ApiTags('Synchronization')
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  // Sincroniza os dados com o app
  @Post('')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    // Documentação da resposta pro swagger
    description: 'Dados sincronizados com sucesso',
    content: {
      'application/json': {
        schema: {
          example: JSON.parse(fs.readFileSync('sync-example.json', 'utf8')),
        },
      },
    },
  })
  sync(@Request() req: any, @Body() syncDto: SyncDto) {
    return this.syncService.sync(req, syncDto);
  }
}
