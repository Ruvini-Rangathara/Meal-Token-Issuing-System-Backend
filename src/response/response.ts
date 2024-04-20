import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

export class Response{
  statusCode: HttpStatus;
  message: string;
  data: any;

  constructor(statusCode: HttpStatus, message: string,  data?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
