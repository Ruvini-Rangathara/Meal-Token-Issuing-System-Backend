import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from '../entities/meal.entity';
import { DataSource, Repository } from 'typeorm';
import { MealDTO } from '../dto/meal.dto';
import { Item } from '../entities/item.entity';
import { ItemInMeal } from '../entities/item-in-meal.entity';
import { Convertor } from '../util/convertor';
import { FindItemInMealDTO } from '../dto/find-item-in-meal.dto';
import { FindMealDTO } from '../dto/find-meal.dto';

export class MealService {

  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemInMeal)
    private readonly itemInMealRepository: Repository<ItemInMeal>,
    private readonly datasource: DataSource,
  ) {
  }

  async findAll(): Promise<MealDTO[]> {
    try {
      console.log('Calling get all method in meal service');
      let meals = await this.mealRepository.find();
      let mealDto: MealDTO[] = [];
      for (let meal of meals) {
        mealDto.push(Convertor.convertToMealDTO(meal));
      }
      return mealDto;
    } catch (error) {
      throw error;
    }
  }

  async findOne(mealId: any): Promise<FindMealDTO> {
    try {
      console.log('Calling find by id method in meal service : ', mealId);
      const meal = await this.mealRepository.query('SELECT * FROM meal WHERE id = $1', [mealId]);
      let newVar = await this.itemInMealRepository.query('SELECT * FROM item_in_meal WHERE "mealId" = $1', [mealId]);
      await this.datasource.query('COMMIT');

      let findItemInMeal: FindItemInMealDTO[] = [];
      // find all item according to item id in item in meal

      let findMealDTO = new FindMealDTO();
      for (let itemInMeal of newVar) {
        let { id, price,mealId, itemId } = itemInMeal;
        let item = await this.itemRepository.query('SELECT * FROM item WHERE id = $1', [itemId]);
        let dto  = new FindItemInMealDTO();
        dto.item = Convertor.convertToItemDTO(item[0]);
        dto.id = id;
        dto.price = price;
        findItemInMeal.push(dto);
      }

      findMealDTO.id = meal[0].id;
      findMealDTO.token = meal[0].token;
      findMealDTO.totalPrice = meal[0].totalPrice;
      findMealDTO.findItemInMeal = findItemInMeal;

      if (!meal[0]) {
        return null;
      }
      return findMealDTO;
    } catch (error) {
      console.log("Error : ", error)
      throw error;
    }
  }

  async create(mealData): Promise<any> {
    const queryRunner = this.datasource.createQueryRunner();
    try {
      console.log('Calling create method in meal service : ', mealData);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const newMeal = new Meal(); // Create an instance of the Meal entity
      newMeal.token = await this.generateToken();
      newMeal.totalPrice = mealData.totalPrice;

      console.log('New meal : ', newMeal);

      const savedMeal = await this.mealRepository.query(
        `INSERT INTO meal (token, "totalPrice")
         VALUES ($1, $2) RETURNING *;`,
        [newMeal.token, newMeal.totalPrice]);

      let idArray: number[] = [];
      for (let itemData of mealData.itemsInMeal) {
        const { itemId, price } = itemData;

        // Retrieve Item entity based on itemId
        const item = await this.itemRepository.query('SELECT * FROM item WHERE id = $1', [itemId]);

        const newItemInMeal = new ItemInMeal();
        newItemInMeal.meal = null; // Set the reference to the saved Meal entity
        newItemInMeal.item = item;
        newItemInMeal.price = price;

        const insertedItem = await this.itemRepository.query(
          `INSERT INTO item_in_meal (price, "mealId", "itemId")
           VALUES ($1, $2, $3) RETURNING *;`,
          [newItemInMeal.price, null, itemId]);
        idArray.push(insertedItem[0].id);
      }
      return [savedMeal[0], idArray];
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  //generate token
  async generateToken(): Promise<string> {
    // generate token with today date and time and random number, start with EATO-
    //example : EATO-20210802-221
    // 20210802 is date and 221 is random number
    return 'EATO-' + new Date().toISOString().split('T')[0].replace(/-/g, '') + '-' + Math.floor(Math.random() * 1000);
  }

  async updateMealId(mealId: number, idArray: number[]): Promise<boolean> {
    try {
      for (let id of idArray) {
        let newVar = await this.itemInMealRepository.query(
          'UPDATE item_in_meal SET "mealId" = $1 WHERE id = $2 RETURNING *',
          [mealId, id]);
        await this.datasource.query('COMMIT');
      }
      return true;
    } catch (error) {
      throw error;
    }
  }


}