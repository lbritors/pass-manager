import { title } from 'process';
import { BadRequestException, ConflictException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from '@prisma/client';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly repository: NotesRepository){}
async  create(createNoteDto: CreateNoteDto, user: User) {
    const { title } = createNoteDto;
    if (!createNoteDto) throw new BadRequestException();
  const note = await this.repository.findByTitle(title, user);
  if (note) throw new ConflictException();
    return this.repository.create(createNoteDto, user);
  }

  async findAll(user: User) {
    const note = await this.repository.findAll(user);
    if (!note) throw new NotFoundException();
    if (!user) throw new ForbiddenException();

    return note;
  }

async  findOne(id: number, user: User) {
    const note = await this.repository.findOne(id, user);
  if (!note) throw new NotFoundException();
  if (!user) throw new ForbiddenException();

  return note;
  }
 async remove(id: number, user: User) {
    const note = await this.repository.findOne(id, user);
    if (!note) throw new NotFoundException();
    if (!user) throw new ForbiddenException();
   return await this.repository.remove(id, user);
  }
}

