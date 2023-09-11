import { Credential } from './../../node_modules/.prisma/client/index.d';
import { Injectable, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import * as bcrypt from "bcrypt";
import { CredentialsRepository } from './credentials.repository';
import Cryptr from 'cryptr';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { title } from 'process';



@Injectable()
export class CredentialsService {
  private config: ConfigService;
  private cryptr: Cryptr;
  constructor(
    private readonly repository: CredentialsRepository,
    configService: ConfigService) {
    const Cryptr = require('cryptr');
    this.config = configService;
    const key = process.env.JWT_SECRET;
    this.cryptr = new Cryptr(key);

    
   }
 async create(user: User, createCredentialDto: CreateCredentialDto) {
    const { password, title } = createCredentialDto;
   const hashed = this.cryptr.encrypt(password);
   const name = await this.repository.findByTitle(title);
   if (name) throw new ConflictException();

   return await this.repository.create(user, { ...createCredentialDto, password: hashed });
  }

  async findAll(user: User) {
    const credential = await this.repository.findAll(user);
    if (!credential) return [];
    if (user.id !== credential[0].userId) throw new ForbiddenException();
    const decrypt = credential.map((cred) => {
      return {
        
          id: cred.id,
          title: cred.title,
          userLogin: cred.userLogin,
          url: cred.url,
          password: this.cryptr.decrypt(cred.password),
          userId: cred.userId
        }
    });

    return decrypt;
  }

  async findOne(id: number, user: User) {
    const credential = await this.repository.findOne(id, user);
    if (credential.userId !== user.id) throw new ForbiddenException();
    if (!credential) throw new NotFoundException();
    const decrypt = {
      id: credential.id,
      title: credential.title,
      userLogin: credential.userLogin,
      url: credential.url,
      password: this.cryptr.decrypt(credential.password),
      userId: credential.userId
    }

    return decrypt;
  }
  async remove(user: User, id: number) {
    
    const credential = await this.repository.findOne(id, user);
    if (!credential) throw new NotFoundException();
    if (credential.userId !== user.id) throw new ForbiddenException();
    return this.repository.remove(user, id); 
  }
}
