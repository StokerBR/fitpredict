import { Test, TestingModule } from '@nestjs/testing';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { PrismaService } from '../prisma/prisma.service';

describe('StatController', () => {
  let controller: StatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatController],
      providers: [StatService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<StatController>(StatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
