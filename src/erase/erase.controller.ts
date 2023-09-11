import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorators';
import { User as UserPrisma } from '@prisma/client';
import { CreateEraseDto } from './dto/create-erase.dto';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Delete()
  remove(@User() user: UserPrisma, @Body() createEraseDto: CreateEraseDto) {
    return this.eraseService.remove(user, createEraseDto);
  }
}
