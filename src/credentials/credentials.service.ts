import { Injectable, ConflictException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import * as bcrypt from "bcrypt";
import { CredentialsRepository } from './credentials.repository';
import Cryptr from 'cryptr';
import { User } from '@prisma/client';


@Injectable()
export class CredentialsService {
  constructor(private readonly repository: CredentialsRepository,
  private readonly crypt: Cryptr) { }

 async create(user: User, createCredentialDto: CreateCredentialDto) {
    const { password, title } = createCredentialDto;
   const hashed = this.crypt.encrypt(password);
   const name = await this.repository.findByTitle(title);
   if (name) throw new ConflictException();

   return await this.repository.create(user, { ...createCredentialDto, password: hashed });
  }

  findAll() {
    return `This action returns all credentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
