import { IsEmail } from 'class-validator';
import { SignUpDto } from './dtos/signup.dto';
import { Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Jwt } from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import { SignInDto } from './dtos/signin.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = "7 days";
  private ISSUER = "Driven";
  private AUDIENCE = "users";

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
    ) { }

  async signUp(SignUpDto: SignUpDto) {
    return await this.userService.create(SignUpDto);
  }

  async signIn(SignInDto: SignInDto) {
    const { email, password } = SignInDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException("Email or password not valid!");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException("Email or password not valid!");
    
    return this.createToken(user);
  }

  async createToken(user: User) {
    const { id } = user;
    const token = this.jwtService.sign({ id },  {
      expiresIn: this.EXPIRATION_TIME,
      audience: this.AUDIENCE,
      issuer: this.ISSUER
    });

    return await this.userService.createLogin(user, token);
  }

  verifyToken(token: string) {
    const split = token.split("Bearer ")[1];
    try {
      const data = this.jwtService.verify(split, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER
      });
      return data;
    } catch (error) {
      console.log(error.message);
    }

  }

}