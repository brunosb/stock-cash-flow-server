import { Supplier } from '../entities/supplier';

export abstract class SuppliersRepository {
  abstract create(supplier: Supplier): Promise<void>;
  abstract save(supplier: Supplier): Promise<void>;
  abstract findById(supplierId: string): Promise<Supplier | undefined>;
  abstract findByName(supplierName: string): Promise<Supplier | undefined>;
  abstract existsById(supplierId: string): Promise<boolean>;
  abstract delete(supplierId: string): Promise<void>;
}
