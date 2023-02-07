import { HttpException, HttpStatus } from '@nestjs/common';

export class SupplierNotFound extends HttpException {
  constructor() {
    super('Supplier not found', HttpStatus.NOT_FOUND);
  }
}
