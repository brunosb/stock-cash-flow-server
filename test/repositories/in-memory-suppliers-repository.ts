import { Supplier } from '@modules/customer-supplier/application/entities/supplier';
import { SuppliersRepository } from '@modules/customer-supplier/application/repositories/suppliers-repository';

export class InMemorySuppliersRepository implements SuppliersRepository {
  public suppliers: Supplier[] = [];

  async create(supplier: Supplier): Promise<void> {
    this.suppliers.push(supplier);
  }

  async save(supplier: Supplier): Promise<void> {
    const supplierIndex = this.suppliers.findIndex(
      (item) => item.id === supplier.id && !item.deletedAt,
    );

    if (supplierIndex >= 0) {
      this.suppliers[supplierIndex] = supplier;
    }
  }

  async findById(supplierId: string): Promise<Supplier | undefined> {
    return this.suppliers.find(
      (item) => item.id === supplierId && !item.deletedAt,
    );
  }

  async findByName(supplierName: string): Promise<Supplier | undefined> {
    return this.suppliers.find(
      (item) =>
        item.name.trim().toLocaleLowerCase() ===
          supplierName.trim().toLocaleLowerCase() && !item.deletedAt,
    );
  }

  async existsById(supplierId: string): Promise<boolean> {
    return this.suppliers.some(
      (item) => item.id === supplierId && !item.deletedAt,
    );
  }

  async delete(supplierId: string): Promise<void> {
    const supplierIndex = this.suppliers.findIndex(
      (item) => item.id === supplierId,
    );

    this.suppliers[supplierIndex].deletedAt = new Date();
  }
}
