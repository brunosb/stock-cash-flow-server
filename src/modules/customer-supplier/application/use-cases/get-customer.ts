import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer';
import { CustomersRepository } from '../repositories/customers-repository';
import { CustomerNotFound } from './errors/customer-not-found';

interface GetCustomerRequest {
  customerId: string;
}

interface GetCustomerResponse {
  customer: Customer;
}

@Injectable()
export class GetCustomer {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(request: GetCustomerRequest): Promise<GetCustomerResponse> {
    const { customerId } = request;

    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFound();
    }

    return {
      customer,
    };
  }
}
