import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from '../response/response';
import { ItemService } from '../service/item.service';

@Controller('item')
export class ItemController {

  constructor(
    private readonly itemService: ItemService,
  ) {
  }

  @Get()
  async findAll(): Promise<Item[]> {

  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Item> {

  }

  @Post()
  async create(@Body() itemData: Partial<Item>): Promise<Item> {

  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() itemData: Partial<Item>): Promise<Item> {

  }


  @Delete(':id')
  async remove(@Param('id') id: any): Promise<void> {

  }


}