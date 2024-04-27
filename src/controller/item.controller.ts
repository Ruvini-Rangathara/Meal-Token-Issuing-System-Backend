import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Response } from '../response/response';
import { ItemDTO } from '../dto/item.dto';
import { ItemService } from '../service/item.service';

@Controller('item')
export class ItemController {

  constructor(
    private readonly itemService: ItemService,
  ) {
  }

  @Get()
  async findAll(): Promise<Response> {
    let all = await this.itemService.findAll();
    try {
      if (all) {
        return new Response(HttpStatus.OK, 'Items found', all);
      } else {
        return new Response(HttpStatus.NOT_FOUND, 'No items found', null);
      }
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Response> {
    try {
      let item = await this.itemService.findOne(id);
      if (item) {
        return new Response(HttpStatus.OK, 'Item found', item);
      } else {
        return new Response(HttpStatus.NOT_FOUND, 'Item not found', null);
      }
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }

  @Post()
  async create(@Body() itemData: ItemDTO): Promise<Response> {
    try {
      let itemDTO =await this.itemService.create(itemData);
      return new Response(HttpStatus.CREATED, 'Item created', itemDTO);
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() itemData: ItemDTO): Promise<Response> {
    try {
      if (!await this.itemService.findOne(id)) {
        return new Response(HttpStatus.NOT_FOUND, 'Item not found', null);
      }
      await this.itemService.update(id, itemData);
      let itemDTO = new ItemDTO();
      itemDTO.id = id;
      itemDTO.name = itemData.name;
      itemDTO.picture = itemData.picture;
      itemDTO.price = itemData.price;
      return new Response(HttpStatus.OK, 'Item updated', itemDTO);
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }


  @Delete(':id')
  async remove(@Param('id') id: any): Promise<Response> {
    try {
      let itemDTO = await this.itemService.findOne(id);
      if (!itemDTO) {
        return new Response(HttpStatus.NOT_FOUND, 'Item not found with id : ' + id, null);
      }
      await this.itemService.delete(id);
      return new Response(HttpStatus.OK, 'Item deleted', itemDTO);
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }


}