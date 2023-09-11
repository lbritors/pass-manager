import { Module } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseController } from './erase.controller';
import { EraseRepository } from './erase.repository';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { UsersModule } from 'src/users/users.module';
import { NotesModule } from 'src/notes/notes.module';
import { CardsModule } from 'src/cards/cards.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [CredentialsModule, UsersModule, NotesModule, CardsModule],
  controllers: [EraseController],
  providers: [EraseService, EraseRepository, ConfigService],
})
export class EraseModule {}
