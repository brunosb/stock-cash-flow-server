import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address';
import { Customer } from '../entities/customer';
import { AddressesRepository } from '../repositories/addresses-repository';
import { CustomersRepository } from '../repositories/customers-repository';
import { CustomerAlreadyExists } from './errors/customer-already-exists';
import { CustomerNotFound } from './errors/customer-not-found';

interface UpdateAddressRequest {
  id?: string;
  street: string;
  number: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  additionalInformation?: string;
}

interface UpdateCustomerRequest {
  id: string;
  storeName: string;
  contactName: string;
  phones?: string[];
  email?: string;
  addressRaw?: UpdateAddressRequest;
}

interface UpdateCustomerResponse {
  customer: Customer;
}

@Injectable()
export class UpdateCustomer {
  constructor(
    private customersRepository: CustomersRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute(
    request: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse> {
    const { id, storeName, contactName, phones, email, addressRaw } = request;

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new CustomerNotFound();
    }

    const customerExistByStoreName =
      await this.customersRepository.findByStoreName(storeName);

    if (customerExistByStoreName) {
      if (customerExistByStoreName.id !== id) {
        throw new CustomerAlreadyExists();
      }
    }

    customer.storeName = storeName;
    customer.contactName = contactName;
    customer.phones = phones;
    customer.email = email;

    if (addressRaw) {
      const address = await this.addressesRepository.findById(addressRaw.id);

      if (address) {
        address.street = addressRaw.street;
        address.number = addressRaw.number;
        address.neighborhood = addressRaw.neighborhood;
        address.city = addressRaw.city;
        address.state = addressRaw.state;
        address.zipCode = addressRaw.zipCode;
        address.country = addressRaw.country;
        address.additionalInformation = addressRaw.additionalInformation;

        await this.addressesRepository.save(address);
        customer.address = address;
      } else {
        const addressCreate = new Address({ ...addressRaw });

        await this.addressesRepository.create(addressCreate);

        customer.address = addressCreate;
      }
    } else {
      customer.address = undefined;
    }

    await this.customersRepository.save(customer);

    return {
      customer,
    };
  }
}
