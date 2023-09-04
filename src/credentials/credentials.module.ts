import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import Cryptr from 'cryptr';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, ConfigService],
  exports: [CredentialsService]
})
export class CredentialsModule {}
