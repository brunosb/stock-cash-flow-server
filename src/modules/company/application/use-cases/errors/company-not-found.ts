import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyNotFound extends HttpException {
  constructor() {
    super('Company not found', HttpStatus.NOT_FOUND);
  }
}
