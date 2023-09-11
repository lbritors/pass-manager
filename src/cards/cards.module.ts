import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { CardsRepository } from './cards.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, ConfigService],
  exports: [CardsService]
})
export class CardsModule {}
