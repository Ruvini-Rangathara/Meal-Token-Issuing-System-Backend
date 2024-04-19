import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

export class Response{
  message: string;
  statusCode: HttpStatus;
  data: any;

  constructor(message: string, statusCode: HttpStatus, data?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
