import { HttpException, HttpStatus } from '@nestjs/common';

export class SupplierAlreadyExists extends HttpException {
  constructor() {
    super('Supplier already exists', HttpStatus.NOT_ACCEPTABLE);
  }
}
