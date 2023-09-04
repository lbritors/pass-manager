import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { UsersRepository } from './users.respository';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) { };

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashedPass = bcrypt.hashSync(password, 10);

    const exists = await this.repository.findUserByEmail(email);
    if (exists) throw new ConflictException();

    return await this.repository.create({...createUserDto, password: hashedPass})
  }

  async createLogin(user: User, token: string) {
    return await this.repository.createLogin(user, token);
  }

  async findUserByEmail(email: string) {
    return await this.repository.findUserByEmail(email);
  }
  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
