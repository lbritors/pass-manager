import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, CredentialsModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
