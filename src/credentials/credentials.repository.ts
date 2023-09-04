import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CredentialsRepository {

  constructor(private readonly prisma: PrismaService) {}
  create(userPrisma: User, createCredentialDto: CreateCredentialDto) {
    return this.prisma.credential.create({
      data: createCredentialDto,
      user: {
        connect: userPrisma
      }
    })
  }

  findAll() {
    return `This action returns all credentials`;
  }

  findByTitle(title: string) {
    return this.prisma.credential.findFirst({
      where: {
        title
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
