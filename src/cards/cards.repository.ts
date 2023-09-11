import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(createCardDto: CreateCardDto, user: User) {
    const { owner, cv, title, number, virtual, password, type, expiration } = createCardDto;
    return this.prisma.card.create({
      data: {
        owner,
        cv,
        title,
        number,
        virtual,
        password,
        type,
        expiration,
        user: {
          connect: user
        }
      },
    })
  }

  findAll(user: User) {
    return this.prisma.card.findMany({
      where: {
        userId: user.id
      },
    })
  }

  findByTitle(title: string, user: User) {
    return this.prisma.card.findFirst({
      where: {
        title,
        user
      }
    })
  }

  findOne(id: number, user: User) {
    return this.prisma.card.findFirst({
      where: {
        id,
        userId: user.id
      }
    })
  }

  remove(id: number, user: User) {
    return this.prisma.card.delete({
      where: {
        id,
        userId: user.id
      }
    })
  }
}
