import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorators';
import { User as UserPrisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
    return this.cardsService.create(createCardDto, user);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    return this.cardsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardsService.findOne(+id, user);
  }
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardsService.remove(+id, user);
  }
}
