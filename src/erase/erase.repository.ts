import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EraseRepository {

constructor(private readonly prisma: PrismaService) {}
  remove(id: number, user: User) {
    return this.prisma.user.delete({
      where: {
        id,
      } 
    })
  }
}
