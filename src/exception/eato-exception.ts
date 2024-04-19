import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

export class EatoException extends HttpException {
  constructor(message: string, statusCode: HttpStatus, data?: any) {
    super({ message, data }, statusCode);
  }
}