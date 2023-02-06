import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyAlreadyExists extends HttpException {
  constructor() {
    super('Company already exists', HttpStatus.NOT_ACCEPTABLE);
  }
}
