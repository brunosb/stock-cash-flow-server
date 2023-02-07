import { Address } from '@modules/customer-supplier/application/entities/address';
import { AddressesRepository } from '@modules/customer-supplier/application/repositories/addresses-repository';

export class InMemoryAddressesRepository implements AddressesRepository {
  public companies: Address[] = [];

  async create(address: Address): Promise<void> {
    this.companies.push(address);
  }

  async save(address: Address): Promise<void> {
    const addressIndex = this.companies.findIndex(
      (item) => item.id === address.id && !item.deletedAt,
    );

    if (addressIndex >= 0) {
      this.companies[addressIndex] = address;
    }
  }

  async findById(addressId: string): Promise<Address | undefined> {
    return this.companies.find(
      (item) => item.id === addressId && !item.deletedAt,
    );
  }

  async existsById(addressId: string): Promise<boolean> {
    return this.companies.some(
      (item) => item.id === addressId && !item.deletedAt,
    );
  }

  async delete(addressId: string): Promise<void> {
    const addressIndex = this.companies.findIndex(
      (item) => item.id === addressId,
    );

    this.companies[addressIndex].deletedAt = new Date();
  }
}
