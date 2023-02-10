import { CompaniesRepository } from '@modules/company/application/repositories/companies-repository';
import { CompanyNotFound } from '@modules/company/application/use-cases/errors/company-not-found';
import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address';
import { Supplier } from '../entities/supplier';
import { SuppliersRepository } from '../repositories/suppliers-repository';
import { SupplierAlreadyExists } from './errors/supplier-already-exists';

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

interface CreateSupplierRequest {
  name: string;
  phones?: string[];
  email?: string;
  addressRaw?: CreateAddressRequest;
  companyId: string;
}

interface CreateSupplierResponse {
  supplier: Supplier;
}

@Injectable()
export class CreateSupplier {
  constructor(
    private suppliersRepository: SuppliersRepository,
    private companiesRepository: CompaniesRepository,
  ) {}

  async execute(
    request: CreateSupplierRequest,
  ): Promise<CreateSupplierResponse> {
    const { name, phones, email, addressRaw, companyId } = request;

    const company = await this.companiesRepository.findById(companyId);

    if (!company) {
      throw new CompanyNotFound();
    }

    const existsByName = await this.suppliersRepository.existsByName(name);

    if (existsByName) {
      throw new SupplierAlreadyExists();
    }

    const supplier = new Supplier({
      name,
      phones,
      email,
      address: addressRaw ? new Address({ ...addressRaw }) : undefined,
      company,
    });

    await this.suppliersRepository.create(supplier);

    return {
      supplier,
    };
  }
}
