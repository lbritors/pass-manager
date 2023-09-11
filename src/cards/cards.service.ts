import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { User } from '@prisma/client';
import { CardsRepository } from './cards.repository';
import { ConfigService } from '@nestjs/config';
import Cryptr from 'cryptr';

@Injectable()
export class CardsService {
  private config: ConfigService;
  private cryptr: Cryptr;
  constructor(private readonly repository: CardsRepository,
    configService: ConfigService) {
      const Cryptr = require('cryptr');
      this.config = configService;
      const key = process.env.JWT_SECRET;
      this.cryptr = new Cryptr(key);
  }
async create(createCardDto: CreateCardDto, user: User) {
  const { title, password } = createCardDto;
  const hashed = this.cryptr.encrypt(password);
  if (!createCardDto) throw new BadRequestException();
  const exists = await this.repository.findByTitle(title, user);
  if (exists) throw new ConflictException();
  
  return await this.repository.create({...createCardDto, password: hashed}, user);

  }

async  findAll(user: User) {
  const cards = await this.repository.findAll(user);
  if (!cards) return [];
  if (user.id !== cards[0].userId) throw new ForbiddenException();
  const decrypt = cards.map((c) => {
    return {
      id: c.id,
      title: c.title,
      cv: c.cv,
      expiration: c.expiration,
      owner: c.owner,
      number: c.number,
      password: this.cryptr.decrypt(c.password),
      userId: c.userId,
      type: c.type,
      virtual: c.virtual
    }
  });
  return decrypt;
}

async findOne(id: number, user: User) {
  const card = await this.repository.findOne(id, user);
  if (card.userId !== user.id) throw new ForbiddenException();
  if (!card) throw new NotFoundException();
  const decrypt = {
      
      id: card.id,
      title: card.title,
      cv: card.cv,
      expiration: card.expiration,
      owner: card.owner,
      number: card.number,
      password: this.cryptr.decrypt(card.password),
      userId: card.userId,
      type: card.type,
      virtual: card.virtual
    }
  return decrypt;  
}

async remove(id: number, user: User) {
    const card = await this.repository.findOne(id, user);
    if (!card) throw new NotFoundException();
    if (card.userId !== user.id) throw new ForbiddenException();
    return this.repository.remove(id, user); 
  }
}
