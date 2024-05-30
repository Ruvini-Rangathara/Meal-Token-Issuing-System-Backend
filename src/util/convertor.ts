import { MealDTO } from '../dto/meal.dto';
import { Meal } from '../entities/meal.entity';
import { Item } from '../entities/item.entity';
import { ItemDTO } from '../dto/item.dto';
import { EmployeeDTO } from '../dto/employee.dto';
import { Employee } from '../entities/employee.entity';

export class Convertor{

  static convertToMeal(mealDto:MealDTO): Meal{
    return {
      id: mealDto.id,
      token: mealDto.token,
      totalPrice: mealDto.totalPrice,
      itemsInMeal: []
    }
  }

  static convertToMealDTO(meal: Meal): MealDTO {
    return {
      id: meal.id,
      token: meal.token,
      totalPrice: meal.totalPrice,
      itemsInMeal: []
    };
  }

  static convertToItemDTO(item:Item): ItemDTO {
    let itemDto = new ItemDTO();
    itemDto.id = item.id;
    itemDto.name = item.name;
    itemDto.price = item.price;
    itemDto.picture = item.picture;
    return itemDto;
  }

  static convertToItem(itemDto:ItemDTO): Item {
    let item = new Item();
    item.id = itemDto.id;
    item.name = itemDto.name;
    item.price = itemDto.price;
    item.picture = itemDto.picture;
    return item;
  }

  static convertToEmployeeDTO(employee: Employee): EmployeeDTO {
    let employeeDto = new EmployeeDTO();
    employeeDto.emp_no = employee.emp_no;
    employeeDto.title = employee.title;
    employeeDto.name = employee.name;
    employeeDto.mobile = employee.mobile;
    employeeDto.address = employee.address;
    employeeDto.nic = employee.nic;
    employeeDto.status = employee.status;
    employeeDto.picture = employee.picture;
    return employeeDto;
  }

  static convertToEmployee(employeeDto: EmployeeDTO): Employee {
    let employee = new Employee();
    employee.emp_no = employeeDto.emp_no;
    employee.title = employeeDto.title;
    employee.name = employeeDto.name;
    employee.mobile = employeeDto.mobile;
    employee.address = employeeDto.address;
    employee.nic = employeeDto.nic;
    employee.status = employeeDto.status;
    employee.picture = employeeDto.picture;
    return employee;
  }

  }