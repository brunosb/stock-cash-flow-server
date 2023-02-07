import { CompaniesRepository } from '@modules/company/application/repositories/companies-repository';
import { CompanyNotFound } from '@modules/company/application/use-cases/errors/company-not-found';
import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address';
import { Customer } from '../entities/customer';
import { CustomersRepository } from '../repositories/customers-repository';

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

    const customer = new Customer({
      storeName,
      contactName,
      phones,
      email,
      address: new Address({ ...addressRaw }),
      company,
    });

    await this.customersRepository.create(customer);

    return {
      customer,
    };
  }
}
