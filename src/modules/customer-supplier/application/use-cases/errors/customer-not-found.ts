import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomerNotFound extends HttpException {
  constructor() {
    super('Customer not found', HttpStatus.NOT_FOUND);
  }
}
