import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Response } from '../response/response';
import { EmployeeDTO } from '../dto/employee.dto';
import { EmployeeService } from '../service/employee.service';

@Controller('employee')
export class EmployeeController {

  constructor(
    private readonly employeeService: EmployeeService,
  ) {}

  @Get()
  async findAll(): Promise<Response> {
    try {
      const all = await this.employeeService.findAll();
      if (all) {
        return new Response(HttpStatus.OK, 'Employees found', all);
      } else {
        return new Response(HttpStatus.NOT_FOUND, 'No employees found', null);
      }
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }

  @Get(':emp_no')
  async findOne(@Param('emp_no') emp_no: number): Promise<Response> {
    try {
      const employee = await this.employeeService.findOne(emp_no);
      if (employee) {
        console.log("Employee found", employee);
        return new Response(HttpStatus.OK, 'Employee found', employee);
      } else {
        return new Response(HttpStatus.NOT_FOUND, 'Employee not found', null);
      }
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }

  @Post()
  async create(@Body() employeeData: EmployeeDTO): Promise<Response> {
    try {
      const employeeDTO = await this.employeeService.create(employeeData);
      return new Response(HttpStatus.CREATED, 'Employee created', employeeDTO);
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }

  @Put(':emp_no')
  async update(@Param('emp_no') emp_no: number, @Body() employeeData: EmployeeDTO): Promise<Response> {
    try {
      if (!await this.employeeService.findOne(emp_no)) {
        return new Response(HttpStatus.NOT_FOUND, 'Employee not found', null);
      }
      let employeeDTO1 = await this.employeeService.update(emp_no, employeeData);
      return new Response(HttpStatus.OK, 'Employee updated', employeeDTO1);
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }

  @Delete(':emp_no')
  async remove(@Param('emp_no') emp_no: number): Promise<Response> {
    try {
      const employeeDTO = await this.employeeService.findOne(emp_no);
      if (!employeeDTO) {
        return new Response(HttpStatus.NOT_FOUND, 'Employee not found with emp_no: ' + emp_no, null);
      }
      await this.employeeService.delete(emp_no);
      return new Response(HttpStatus.OK, 'Employee deleted', employeeDTO);
    } catch (e) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred', null);
    }
  }
}
