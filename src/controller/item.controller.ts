import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('item')
export class ItemController {
    constructor(
      @InjectRepository(Item)
      private readonly itemRepository: Repository<Item>,
    ) {}

  @Get()
  async findAll(): Promise<Item[]> {
    console.log("Calling Get all method")
    return await this.itemRepository.find();
  }

  @Get(':id')
  async findOne(id: any): Promise<Item> {
    console.log("Calling Get one method")
    return await this.itemRepository.findOne(id);
  }

  @Post()
  async create(item: Item): Promise<Item> {
      console.log("Calling Post method")
      return await this.itemRepository.save(item);
  }

  @Put(':id')
  async update(@Param('id') id:any , @Body() item: Item): Promise<Item> {
      console.log("Calling Put method")
      await this.itemRepository.update(id, item);
      return await this.itemRepository.findOne(id);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: any): Promise<Item> {
  //   await this.itemRepository.delete(id);
  // }

}