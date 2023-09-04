import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CredentialsRepository {

  constructor(private readonly prisma: PrismaService) {}
  create(userPrisma: User, createCredentialDto: CreateCredentialDto) {
    const { title, password, userLogin, url } = createCredentialDto;
    return this.prisma.credential.create({
      data: {
        title,
        password,
        userLogin,
        url,
        user: {
          connect: userPrisma
        }
      }
    })
  }

  findAll(user: User) {
    return this.prisma.credential.findMany({
      where: {
        user: user
      }
    });
  }

  findByTitle(title: string) {
    return this.prisma.credential.findFirst({
      where: {
        title
      }
    })
  }

  findOne(id: number, user: User) {
    return this.prisma.credential.findFirst({
      where: {
        id,
        userId: user.id
      }
    })
  }

  remove(user: User, id: number) {
    return this.prisma.credential.delete({
      where: {
        id,
        user: user
      }
    })
  }
}
