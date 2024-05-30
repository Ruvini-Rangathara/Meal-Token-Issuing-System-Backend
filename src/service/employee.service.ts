import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { EmployeeDTO } from '../dto/employee.dto';
import { Convertor } from '../util/convertor';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<EmployeeDTO[]> {
    try {
      console.log('Calling get all method in employee service');
      const employees = await this.employeeRepository.find();
      const employeeDto: EmployeeDTO[] = [];
      for (const employee of employees) {
        employeeDto.push(Convertor.convertToEmployeeDTO(employee));
      }
      return employeeDto;
    } catch (error) {
      throw error;
    }
  }

  async findOne(empNo: number): Promise<EmployeeDTO> {
    try {
      console.log('Calling find by emp_no method in employee service:', empNo);
      const result = await this.employeeRepository.query('SELECT * FROM employee WHERE emp_no = $1', [empNo]);
      if (result.length === 0) {
        return null; // No employee found
      }
      const employee = result[0]; // Assuming result is an array of rows
      return Convertor.convertToEmployeeDTO(employee);
    } catch (error) {
      throw error;
    }
  }

  async create(employeeData: EmployeeDTO): Promise<EmployeeDTO> {
    try {
      console.log('Calling create method in employee service:', employeeData);
      return await this.employeeRepository.save(Convertor.convertToEmployee(employeeData));
    } catch (error) {
      throw error;
    }
  }

  async update(empNo: number, newData: EmployeeDTO): Promise<EmployeeDTO> {
    try {
      const employeeToUpdate = await this.findOne(empNo);
      if (!employeeToUpdate) {
        throw new Error('Employee not found');
      }

      // Merge the existing employee data with the new data
      const updatedEmployeeData = { ...employeeToUpdate, ...newData };

      const result = await this.employeeRepository.query(
        'UPDATE employee SET title = $1, name = $2, mobile = $3, address = $4, nic = $5, status = $6, picture = $7 WHERE emp_no = $8 RETURNING *',
        [
          updatedEmployeeData.title,
          updatedEmployeeData.name,
          updatedEmployeeData.mobile,
          updatedEmployeeData.address,
          updatedEmployeeData.nic,
          updatedEmployeeData.status,
          updatedEmployeeData.picture,
          empNo,
        ],
      );

      return Convertor.convertToEmployeeDTO(result[0][0]) ;
    } catch (error) {
      throw error;
    }
  }

  async delete(empNo: number): Promise<number> {
    try {
      console.log('Calling delete method in employee service:', empNo);
      await this.employeeRepository.delete(empNo);
      return empNo;
    } catch (error) {
      throw error;
    }
  }
}
