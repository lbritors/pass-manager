import { IsEmail } from 'class-validator';
import { SignUpDto } from './dtos/signup.dto';
import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Jwt } from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import { SignInDto } from './dtos/signin.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
let jwt = require('jsonwebtoken');
@Injectable()
export class AuthService {
  private EXPIRATION_TIME = "7 days";
  private ISSUER = "Driven";
  private AUDIENCE = "users";

  constructor(
    private readonly userService: UsersService) { }

  async signUp(SignUpDto: SignUpDto) {
    return await this.userService.create(SignUpDto);
  }

  async singIn(SignInDto: SignInDto) {
    const { email, password } = SignInDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException("Email or password not valid!");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException("Email or password not valid!");
    
    return this.createToken(user);
  }

  createToken(user: User) {
    const { id } = user;
    const token = jwt.sign({ data: id }, process.env.JWT_SECRET, {
      expiresIn: this.EXPIRATION_TIME
    }, { audience: this.AUDIENCE }, { issuer: this.ISSUER });

    return { token };
  }

  verifyToken(token: string) {
    const data = jwt.verify(token, {
      audience: this.AUDIENCE,
      issuer: this.ISSUER
    });

    return data;
  }

}