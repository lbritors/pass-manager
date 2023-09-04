import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { UsersRepository } from './users.respository';
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

  findAll() {
    return `This action returns all users`;
  }

  async findUserByEmail(email: string) {
    return await this.repository.findUserByEmail(email);
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
