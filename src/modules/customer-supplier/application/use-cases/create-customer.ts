import { CompaniesRepository } from '@modules/company/application/repositories/companies-repository';
import { CompanyNotFound } from '@modules/company/application/use-cases/errors/company-not-found';
import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address';
import { Customer } from '../entities/customer';
import { AddressesRepository } from '../repositories/addresses-repository';
import { CustomersRepository } from '../repositories/customers-repository';
import { CustomerAlreadyExists } from './errors/customer-already-exists';

interface CreateAddressRequest {
  street: string;
  number: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  additionalInformation?: string;
}

interface CreateCustomerRequest {
  storeName: string;
  contactName: string;
  phones?: string[];
  email?: string;
  addressRaw?: CreateAddressRequest;
  companyId: string;
}

interface CreateCustomerResponse {
  customer: Customer;
}

@Injectable()
export class CreateCustomer {
  constructor(
    private customersRepository: CustomersRepository,
    private companiesRepository: CompaniesRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute(
    request: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    const { storeName, contactName, phones, email, addressRaw, companyId } =
      request;

    const company = await this.companiesRepository.findById(companyId);

    if (!company) {
      throw new CompanyNotFound();
    }

    const existsByStoreName = await this.customersRepository.findByStoreName(
      storeName,
    );

    if (existsByStoreName) {
      throw new CustomerAlreadyExists();
    }

    const customer = new Customer({
      storeName,
      contactName,
      phones,
      email,
      company,
    });

    if (addressRaw) {
      const address = new Address({ ...addressRaw });

      await this.addressesRepository.create(address);

      customer.address = address;
    }

    await this.customersRepository.create(customer);

    return {
      customer,
    };
  }
}
