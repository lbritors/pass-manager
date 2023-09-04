import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {

  constructor(private readonly prisma: PrismaService) { };
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  createLogin(user: User, token: string) {
    return this.prisma.section.create({
      data: {
        token,
        user: {
          connect: user
        }
      }
    })
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
