import { Injectable } from '@nestjs/common';
import { AddressesRepository } from '../repositories/addresses-repository';
import { CustomersRepository } from '../repositories/customers-repository';
import { CustomerNotFound } from './errors/customer-not-found';

interface DeleteCustomerRequest {
  customerId: string;
}

type DeleteCustomerResponse = void;

@Injectable()
export class DeleteCustomer {
  constructor(
    private customersRepository: CustomersRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute(
    request: DeleteCustomerRequest,
  ): Promise<DeleteCustomerResponse> {
    const { customerId } = request;

    const isExistsById = await this.customersRepository.existsById(customerId);

    if (!isExistsById) {
      throw new CustomerNotFound();
    }

    const customer = await this.customersRepository.findById(customerId);

    if (customer.address) {
      const addressId = customer.address.id;
      await this.addressesRepository.delete(addressId);
    }

    await this.customersRepository.delete(customerId);
  }
}
