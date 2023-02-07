import { Injectable } from '@nestjs/common';
import { Supplier } from '../entities/supplier';
import { SuppliersRepository } from '../repositories/suppliers-repository';
import { SupplierNotFound } from './errors/supplier-not-found';

interface GetSupplierRequest {
  supplierId: string;
}

interface GetSupplierResponse {
  supplier: Supplier;
}

@Injectable()
export class GetSupplier {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute(request: GetSupplierRequest): Promise<GetSupplierResponse> {
    const { supplierId } = request;

    const supplier = await this.suppliersRepository.findById(supplierId);

    if (!supplier) {
      throw new SupplierNotFound();
    }

    return {
      supplier,
    };
  }
}
