import { Customer } from '../entities/customer';

export abstract class CustomersRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract save(customer: Customer): Promise<void>;
  abstract findById(customerId: string): Promise<Customer | undefined>;
  abstract existsById(customerId: string): Promise<boolean>;
  abstract delete(customerId: string): Promise<void>;
}
