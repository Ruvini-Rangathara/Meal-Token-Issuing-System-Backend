import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { Repository } from 'typeorm';
import { ItemDTO } from '../dto/item.dto';
import { Convertor } from '../util/convertor';

export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {
  }

  async findAll(): Promise<ItemDTO[]> {
    try {
      console.log("Calling get all method in service")
      let items = await this.itemRepository.find();
      console.log("Find all items in service : ", items)
      //convert to DTO
      let itemDto: ItemDTO[] = [];
      for (let item of items) {
        itemDto.push(Convertor.convertToItemDTO(item));
      }
      // console.log("Find all items in service after converted to DTO : ", itemDto)
      return itemDto;
    } catch (error) {
      console.error("Error getting items:", error);
      throw error;
    }
  }

  async findOne(id: any): Promise<ItemDTO> {
    try {
      console.log("Calling get one method in service : ", id)
      const item = await this.itemRepository.query('SELECT * FROM item WHERE id = $1', [id]);
      // console.log("Find one item in service : ", item[0])
      if (!item[0]) {
        return null;
      }
      //convert to DTO
      return Convertor.convertToItemDTO(item[0]);
    } catch (error) {
      console.error("Error getting item:", error);
      throw error;
    }
  }

  async create(itemData: ItemDTO): Promise<ItemDTO> {
    try {
      console.log("Received request to create item in service : ", itemData);
      let toItem = Convertor.convertToItem(itemData);
      console.log("Converted item : ", toItem)
      let item = await this.itemRepository.save(toItem);
      console.log("Item created : ", item)
      return item;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  async update(id: any, itemData: ItemDTO): Promise<ItemDTO> {
    try {
      console.log("Received request to update item:", itemData);
      let item = await this.itemRepository.findOne(id);
      item = await this.itemRepository.merge(item, Convertor.convertToItem(itemData));
      console.log("Item updated : ", item)
      return itemData;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  async delete(id: any): Promise<ItemDTO> {
    try {
      console.log("Received request to delete item:", id);
      let item = await this.itemRepository.findOne(id);
      await this.itemRepository.delete(id);
      console.log("Item deleted : ", item)
      return id;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }

}