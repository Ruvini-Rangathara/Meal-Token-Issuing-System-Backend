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
  async findAll(): Response {
    let all = this.itemService.findAll();
    try{
      if (all) {
        return new Response('Items found', HttpStatus.OK, all);
      } else {
        return new Response('No items found', HttpStatus.NOT_FOUND);
      }
    }catch (e){
      return new Response('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Response {
    try{
      let item = this.itemService.findOne(id);
      if (item) {
        return new Response('Item found', HttpStatus.OK, item);
      } else {
        return new Response('Item not found', HttpStatus.NOT_FOUND, null);
      }
    }catch (e){
      return new Response('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @Post()
  async create(@Body() itemData: Partial<Item>): Response{
    try{
      if(await this.itemService.findOne(itemData.id)){
        return new Response('Item already exists', HttpStatus.CONFLICT);
      }

      let itemDTO = this.itemService.create(itemData);
      return new Response('Item created', HttpStatus.CREATED, itemDTO);
    }catch (e) {
      return new Response('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() itemData: Partial<Item>): Response {
    try{
      if(!await this.itemService.findOne(id)){
        return new Response('Item not found', HttpStatus.NOT_FOUND);
      }
      let item = this.itemService.update(id, itemData);
      return new Response('Item updated', HttpStatus.OK, item);
    }catch (e){
      return new Response('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Delete(':id')
  async remove(@Param('id') id: any): Promise<void> {
    try{
      if(await this.itemService.findOne(id)){
        return new Response('Item not found', HttpStatus.NOT_FOUND);
      }
      let itemDTO = await this.itemService.delete(id);
      return new Response('Item deleted', HttpStatus.OK, itemDTO);
    }catch (e){
      return new Response('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}