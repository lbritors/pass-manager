import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.respository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
