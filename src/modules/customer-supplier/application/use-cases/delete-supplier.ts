import { Injectable } from '@nestjs/common';
import { AddressesRepository } from '../repositories/addresses-repository';
import { SuppliersRepository } from '../repositories/suppliers-repository';
import { SupplierNotFound } from './errors/supplier-not-found';

interface DeleteSupplierRequest {
  supplierId: string;
}

type DeleteSupplierResponse = void;

@Injectable()
export class DeleteSupplier {
  constructor(
    private suppliersRepository: SuppliersRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute(
    request: DeleteSupplierRequest,
  ): Promise<DeleteSupplierResponse> {
    const { supplierId } = request;

    const isExistsById = await this.suppliersRepository.existsById(supplierId);

    if (!isExistsById) {
      throw new SupplierNotFound();
    }

    const supplier = await this.suppliersRepository.findById(supplierId);

    if (supplier.address) {
      const addressId = supplier.address.id;
      await this.addressesRepository.delete(addressId);
    }

    await this.suppliersRepository.delete(supplierId);
  }
}
