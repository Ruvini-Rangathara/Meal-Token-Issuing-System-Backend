import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from '../entities/meal.entity';
import { DataSource, Repository } from 'typeorm';
import { MealDTO } from '../dto/meal.dto';
import { Convertor } from '../util/convertor';
import { ItemInMealService } from './item-in-meal.service';
import { Item } from '../entities/item.entity';
import { ItemInMeal } from '../entities/item-in-meal.entity';

export class MealService{

  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    private readonly itemInMealService: ItemInMealService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemInMeal)
    private readonly itemInMealRepository: Repository<ItemInMeal>,

    private readonly datasource: DataSource
  ) {
  }

  async findAll(): Promise<MealDTO[]> {
    try {
      console.log("Calling get all method in service")
      let meals = await this.mealRepository.find();
      // console.log("Find all meals in service : ", meals)
      let mealDto: MealDTO[] = [];
      for (let meal of meals) {
        mealDto.push(Convertor.convertToMealDTO(meal));
      }
      // console.log("Find all mealDTOs in service : ", mealDto)
      return mealDto;
    } catch (error) {
      console.error("Error getting meals:", error);
      throw error;
    }
  }

  async findOne(id: any): Promise<MealDTO> {
    try {
      console.log("Calling get one method in service : ", id);
      const meal = await this.mealRepository.query('SELECT * FROM meal WHERE id = $1', [id]);
      if (!meal[0]) {
        return null;
      }
      // Convert to DTO
      return Convertor.convertToMealDTO(meal[0]);
    } catch (error) {
      console.error("Error getting meal:", error);
      throw error;
    }
  }

  async create(mealData): Promise<any> {
    const queryRunner = this.datasource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      console.log("Received meal : ", mealData);

      const newMeal = new Meal(); // Create an instance of the Meal entity
      newMeal.token = await this.generateToken();
      newMeal.totalPrice = mealData.totalPrice;

      // Save the new Meal entity (insert operation)
      // const savedMeal = await queryRunner.manager.save(newMeal);

      const mealQuery = `INSERT INTO meal (token, "totalPrice") VALUES ($1, $2) RETURNING *;`;
      const mealValues = [newMeal.token, newMeal.totalPrice];

      const savedMeal = await this.mealRepository.query(mealQuery, mealValues);
      console.log("Saved meal:", savedMeal[0]); // Assuming the query returns an array

      let idArray:number[] = [];
      for (let itemData of mealData.itemsInMeal) {
        // Assuming itemData contains mealId and itemId properties
        const { mealId, itemId, price } = itemData;

        // Retrieve Item entity based on itemId
        const item = await this.itemRepository.query('SELECT * FROM item WHERE id = $1', [itemId]);

        // Create a new ItemInMeal entity
        const newItemInMeal = new ItemInMeal();
        newItemInMeal.meal = null; // Set the reference to the saved Meal entity
        newItemInMeal.item = item;
        newItemInMeal.price = price;

        // Save the new ItemInMeal entity
        console.log("Saving new ItemInMeal entity: ", newItemInMeal);
        // await this.itemInMealRepository.save(newItemInMeal);

        const query = `INSERT INTO item_in_meal (price, "mealId", "itemId") VALUES ($1, $2, $3) RETURNING *;`;
        const values = [newItemInMeal.price, null, itemId];

        const insertedItem = await this.itemRepository.query(query, values);
        idArray.push(insertedItem[0].id);
        console.log("Inserted item:", insertedItem[0]); // Assuming the query returns an array
      }
      console.log("ItemInMeal created : ", savedMeal);
      console.log("ItemInMeal id array : ", idArray);
      let result = [savedMeal[0], idArray];
      console.log("Result : ", result);
      return result;
    } catch (error) {
      console.error("Error creating meal:", error);
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
    let token = "EATO-" + new Date().toISOString().split('T')[0].replace(/-/g,"") +"-"+ Math.floor(Math.random() * 1000);
    console.log("Generated token : ",token)
    return token;
  }

  async updateMealId(mealId: number, idArray: number[]): Promise<boolean> {
    try {
      for (const id of idArray) {
        console.log("Updating meal id:", mealId, " for item in meal id:", id);
        const query = `UPDATE item_in_meal SET "mealId" = $1 WHERE id = $2;`;
        const values = [mealId, id];
        await this.itemInMealRepository.query(query, values);
      }
      return true;
    } catch (error) {
      console.error("Error updating meal id:", error);
      throw error;
    }
  }



}