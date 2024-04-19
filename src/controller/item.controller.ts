import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EatoException } from '../exception/eato-exception';

@Controller('item')
export class ItemController {
    constructor(
      @InjectRepository(Item)
      private readonly itemRepository: Repository<Item>,
    ) {}

  @Get()
  async findAll(): Promise<Item[]> {
    try {
      console.log("Calling Get all method")
      let items = await this.itemRepository.find();
      console.log("Items : ",items)

      if (!items) {
        throw new EatoException('Items not found', HttpStatus.NOT_FOUND,
          { additionalData: items});
      }

      return items;
    } catch (error) {
      console.error("Error getting items:", error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Item> {
    try{
      console.log("Calling Get one method")
      let item = await this.itemRepository.findOne(id);

      if(!item){
        throw new EatoException('Item not found', HttpStatus.NOT_FOUND,
          { additionalData: id});
      }

      console.log("Item : ",item)
      return item;
    }catch (error) {
      console.error("Error getting item:", error);
      throw error;
    }
  }

  @Post()
  async create(@Body() itemData: Partial<Item>): Promise<Item> {
    try {
      console.log("Received request to create item:", itemData);

      if(!await this.validateItem(itemData)){
        throw new EatoException('Please check your inputs', HttpStatus.BAD_REQUEST,
          { additionalData: itemData});
      }

      if (await this.itemRepository.findOne(itemData.id)) {
        throw new EatoException('Item already exists', HttpStatus.CONFLICT,
          { additionalData: itemData});
      }

      // Create a new instance of Item with the provided data
      const newItem = this.itemRepository.create(itemData);
      // Save the new item to the database
      const savedItem = await this.itemRepository.save(newItem);
      console.log("Successfully created item:", savedItem);
      return savedItem;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error; // Rethrow the error to be handled by NestJS exception filters
    }
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() itemData: Partial<Item>): Promise<Item> {
    try {
      console.log("Received request to update item:", itemData);

      if(!await this.validateItem(itemData)){
        throw new EatoException('Please check your inputs', HttpStatus.BAD_REQUEST,
          { additionalData: itemData});
      }

      if (!await this.itemRepository.findOne(id)) {
        throw new EatoException('Item not found', HttpStatus.NOT_FOUND,
          { additionalData: id});
      }

      // Find the item with the provided ID
      const item = await this.itemRepository.findOne(id);
      // Merge the existing item with the new data
      this.itemRepository.merge(item, itemData);
      // Save the updated item to the database
      const updatedItem = await this.itemRepository.save(item);
      console.log("Successfully updated item:", updatedItem);

      return updatedItem;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }


  @Delete(':id')
  async remove(@Param('id') id: any): Promise<void> {
    try {
      console.log("Received request to delete item with ID:", id);

      // Find the item with the provided ID
      const item = await this.itemRepository.findOne(id);

      if (!item) {
        throw new EatoException('Item not found', HttpStatus.NOT_FOUND,
          { additionalData: id});
      }

      // Delete the item from the database
      await this.itemRepository.remove(item);

      console.log("Successfully deleted item with ID:", id);
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }


  async validateItem(item: Partial<Item>): Promise<Boolean> {
    return !!(item.name && item.price && item.id && item.picture);
  }

}