import { Address } from '@modules/customer-supplier/application/entities/address';
import { AddressesRepository } from '@modules/customer-supplier/application/repositories/addresses-repository';

export class InMemoryAddressesRepository implements AddressesRepository {
  public addresses: Address[] = [];

  async create(address: Address): Promise<void> {
    this.addresses.push(address);
  }

  async save(address: Address): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      (item) => item.id === address.id && !item.deletedAt,
    );

    if (addressIndex >= 0) {
      this.addresses[addressIndex] = address;
    }
  }

  async findById(addressId: string): Promise<Address | undefined> {
    return this.addresses.find(
      (item) => item.id === addressId && !item.deletedAt,
    );
  }

  async existsById(addressId: string): Promise<boolean> {
    return this.addresses.some(
      (item) => item.id === addressId && !item.deletedAt,
    );
  }

  async delete(addressId: string): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      (item) => item.id === addressId,
    );

    this.addresses[addressIndex].deletedAt = new Date();
  }
}
