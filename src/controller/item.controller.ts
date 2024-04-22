import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Response } from '../response/response';
import { ItemDTO } from '../dto/item.dto';
import { ItemService } from '../service/item.service';
import * as sea from 'node:sea';

@Controller('item')
export class ItemController {

  constructor(
    private readonly itemService: ItemService,
  ) {
  }

  @Get()
  async findAll(): Promise<Response> {
    let all = await this.itemService.findAll();
    try{
      if (all) {
        return new Response(HttpStatus.OK,'Items found',  all);
      } else {
        return new Response( HttpStatus.NOT_FOUND, 'No items found',null);
      }
    }catch (e){
      return new Response( HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred',null);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Response>  {
    console.log("Finding item in controller : ", id)
    try{
      let item =await this.itemService.findOne(id);
      if (item) {
        console.log("Item found in controller : ", item)
        return new Response(HttpStatus.OK,'Item found',  item);
      } else {
        return new Response(HttpStatus.NOT_FOUND,'Item not found', null);
      }
    }catch (e){
      return new Response( HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred',null);
    }
  }

  @Post()
  async create(@Body() itemData: ItemDTO): Promise<Response> {
    console.log("Creating item in controller : ", itemData)
    try{
      let search = await this.itemService.findOne(itemData.id);
      console.log("Search result : ", search)
      if(search != null){
        return new Response(HttpStatus.CONFLICT,'Item already exists', itemData);
      }

      let itemDTO = this.itemService.create(itemData);
      return new Response(HttpStatus.CREATED, 'Item created', itemDTO);
    }catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() itemData: ItemDTO): Promise<Response>  {
    try{
      if(!await this.itemService.findOne(id)){
        return new Response( HttpStatus.NOT_FOUND, 'Item not found',null);
      }
      let item = this.itemService.update(id, itemData);
      return new Response(HttpStatus.OK, 'Item updated', itemData);
    }catch (e){
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }


  @Delete(':id')
  async remove(@Param('id') id: any): Promise<Response> {
    try{
      if(!await this.itemService.findOne(id)){
        return new Response( HttpStatus.NOT_FOUND, 'Item not found with id : '+id ,null);
      }
      let itemDTO = await this.itemService.delete(id);
      return new Response( HttpStatus.OK,'Item deleted', itemDTO);
    }catch (e){
      return new Response( HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }


}