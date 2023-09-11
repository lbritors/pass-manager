import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseRepository } from './erase.repository';
import { User } from '@prisma/client';
import { CardsService } from 'src/cards/cards.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { NotesService } from 'src/notes/notes.service';
import { UsersService } from 'src/users/users.service';
import { CreateEraseDto } from './dto/create-erase.dto';
import { ConfigService } from '@nestjs/config';
import Cryptr from 'cryptr';

@Injectable()
export class EraseService {
  private config: ConfigService;
  private cryptr: Cryptr;

  constructor(private readonly repository: EraseRepository,
    private readonly card: CardsService,
    private readonly credential: CredentialsService,
    private readonly note: NotesService,
    private readonly user: UsersService,
    configService: ConfigService) {
      const Cryptr = require('cryptr');
      this.config = configService;
      const key = process.env.JWT_SECRET;
      this.cryptr = new Cryptr(key);
    
  }
  
 async remove(user: User, createEraseDto: CreateEraseDto) {
  const { password } = createEraseDto;
   const passwordUser = await this.user.findOne(user.id);
   const reHash = this.cryptr.decrypt(passwordUser.password);
   if (reHash !== password) throw new UnauthorizedException("Not allowed");

   await this.card.removeAll(user);
   await this.credential.removeAll(user);
   await this.note.removeAll(user);
   await this.user.remove(user.id)

  
  }
}
