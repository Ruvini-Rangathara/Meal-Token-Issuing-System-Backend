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
      console.log('Calling get all method in item service');
      let items = await this.itemRepository.find();
      let itemDto: ItemDTO[] = [];
      for (let item of items) {
        itemDto.push(Convertor.convertToItemDTO(item));
      }
      return itemDto;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: any): Promise<ItemDTO> {
    try {
      console.log('Calling find by id method in item service : ', id);
      const item = await this.itemRepository.query('SELECT * FROM item WHERE id = $1', [id]);
      if (!item[0]) {
        return null;
      }
      return Convertor.convertToItemDTO(item[0]);
    } catch (error) {
      throw error;
    }
  }

  async create(itemData: ItemDTO): Promise<ItemDTO> {
    try {
      console.log('Calling create method in item service : ', itemData);
      return await this.itemRepository.save(Convertor.convertToItem(itemData));
    } catch (error) {
      throw error;
    }
  }

  async update(id: any, newData: ItemDTO): Promise<ItemDTO> {
    try {
      const itemToUpdate = await this.findOne(id);
      if (!itemToUpdate) {
        throw new Error('Item not found');
      }
      // Merge the existing item data with the new data
      const updatedItemData = { ...itemToUpdate, ...newData };

      const result = await this.itemRepository.query(
        'UPDATE item SET price = $1, name = $2, picture = $3 WHERE id = $4 RETURNING *',
        [updatedItemData.price, updatedItemData.name, updatedItemData.picture, id],
      );
      return Convertor.convertToItemDTO(result[0]);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any): Promise<ItemDTO> {
    try {
      console.log('Calling delete method in item service :', id);
      await this.itemRepository.delete(id);
      return id;
    } catch (error) {
      throw error;
    }
  }

}