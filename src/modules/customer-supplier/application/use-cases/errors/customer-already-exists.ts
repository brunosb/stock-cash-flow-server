import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomerAlreadyExists extends HttpException {
  constructor() {
    super('Customer already exists', HttpStatus.NOT_ACCEPTABLE);
  }
}
