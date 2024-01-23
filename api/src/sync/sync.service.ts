import { PrismaService } from '../prisma/prisma.service';
import { SyncDto } from './dto/sync.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SyncService {
  constructor(private prisma: PrismaService) {}

  /**
   * Sincroniza os dados com o app
   * @param req
   * @param SyncDto
   */
  async sync(req: any, syncDto: SyncDto) {}
}
