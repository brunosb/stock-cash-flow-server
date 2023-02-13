import { CreateCustomer } from '@modules/customer-supplier/application/use-cases/create-customer';
import { DeleteCustomer } from '@modules/customer-supplier/application/use-cases/delete-customer';
import { GetCustomer } from '@modules/customer-supplier/application/use-cases/get-customer';
import { UpdateCustomer } from '@modules/customer-supplier/application/use-cases/update-customer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomerBody } from '../dtos/create-customer-body';
import { UpdateCustomerBody } from '../dtos/update-customer-body';
import { CustomerViewModel } from '../view-models/customer-view-model';

@Controller('customers')
export class CustomersController {
  constructor(
    private createCustomer: CreateCustomer,
    private updateCustomer: UpdateCustomer,
    private getCustomer: GetCustomer,
    private deleteCustomer: DeleteCustomer,
  ) {}

  @Get(':id')
  async get(@Param('id') customerId: string) {
    const { customer } = await this.getCustomer.execute({ customerId });

    return {
      customer: CustomerViewModel.toHTTP(customer),
    };
  }

  @Post()
  async create(@Body() body: CreateCustomerBody) {
    const { customer } = await this.createCustomer.execute(body);

    return {
      customer: CustomerViewModel.toHTTP(customer),
    };
  }

  @Put(':id')
  async update(
    @Param('id') customerId: string,
    @Body() body: UpdateCustomerBody,
  ) {
    const { customer } = await this.updateCustomer.execute({
      id: customerId,
      ...body,
    });

    return {
      customer: CustomerViewModel.toHTTP(customer),
    };
  }

  @Delete(':id')
  async delete(@Param('id') customerId: string) {
    await this.deleteCustomer.execute({ customerId });
  }
}
