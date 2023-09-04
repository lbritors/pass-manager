import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class NotesRepository {

  constructor(private readonly prisma: PrismaService) {}
  create(createNoteDto: CreateNoteDto, user: User) {
    const { title, text } = createNoteDto;
    return this.prisma.note.create({
      data: {
        title,
        text,
        user: {
          connect: user
        }
      }
      })
  }

  findByTitle(title: string) {
    return this.prisma.note.findFirst({
      where: {
        title
      }
    })
  }

  findAll(user: User) {
    return this.prisma.note.findMany({
      where: {
        user
      }
    });
  }

  findOne(id: number, user: User) {
    return this.prisma.note.findFirst({
      where: {
        id,
        user
      }
    })
  }

  remove(id: number, user: User) {
    return this.prisma.note.delete({
      where: {
        id,
        user
      }
    });
  }
}
