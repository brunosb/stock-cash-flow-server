import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address';
import { Supplier } from '../entities/supplier';
import { AddressesRepository } from '../repositories/addresses-repository';
import { SuppliersRepository } from '../repositories/suppliers-repository';
import { SupplierAlreadyExists } from './errors/supplier-already-exists';
import { SupplierNotFound } from './errors/supplier-not-found';

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

interface UpdateSupplierRequest {
  id: string;
  name: string;
  phones?: string[];
  email?: string;
  addressRaw?: UpdateAddressRequest;
}

interface UpdateSupplierResponse {
  supplier: Supplier;
}

@Injectable()
export class UpdateSupplier {
  constructor(
    private suppliersRepository: SuppliersRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute(
    request: UpdateSupplierRequest,
  ): Promise<UpdateSupplierResponse> {
    const { id, name, phones, email, addressRaw } = request;

    const supplier = await this.suppliersRepository.findById(id);

    if (!supplier) {
      throw new SupplierNotFound();
    }

    const supplierExistByName = await this.suppliersRepository.findByName(name);

    if (supplierExistByName) {
      if (supplierExistByName.id !== id) {
        throw new SupplierAlreadyExists();
      }
    }

    supplier.name = name;
    supplier.phones = phones;
    supplier.email = email;

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
        supplier.address = address;
      } else {
        const addressCreate = new Address({ ...addressRaw });

        await this.addressesRepository.create(addressCreate);

        supplier.address = addressCreate;
      }
    } else {
      supplier.address = undefined;
    }

    await this.suppliersRepository.save(supplier);

    return {
      supplier,
    };
  }
}
