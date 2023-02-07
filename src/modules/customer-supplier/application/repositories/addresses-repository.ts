import { Address } from '../entities/address';

export abstract class AddressesRepository {
  abstract create(address: Address): Promise<void>;
  abstract save(address: Address): Promise<void>;
  abstract findById(addressId: string): Promise<Address | undefined>;
  abstract existsById(addressId: string): Promise<boolean>;
  abstract delete(addressId: string): Promise<void>;
}
