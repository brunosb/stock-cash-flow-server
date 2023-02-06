import { HttpException, HttpStatus } from '@nestjs/common';

export class CnpjNotValid extends HttpException {
  constructor() {
    super('CNPJ not valid', HttpStatus.BAD_REQUEST);
  }
}
