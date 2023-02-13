import { Customer } from '@modules/customer-supplier/application/entities/customer';
import { CustomersRepository } from '@modules/customer-supplier/application/repositories/customers-repository';

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (item) => item.id === customer.id && !item.deletedAt,
    );

    if (customerIndex >= 0) {
      this.customers[customerIndex] = customer;
    }
  }

  async findById(customerId: string): Promise<Customer | undefined> {
    return this.customers.find(
      (item) => item.id === customerId && !item.deletedAt,
    );
  }

  async findByStoreName(
    customerStoreName: string,
  ): Promise<Customer | undefined> {
    return this.customers.find(
      (item) =>
        item.storeName.trim().toLocaleLowerCase() ===
          customerStoreName.trim().toLocaleLowerCase() && !item.deletedAt,
    );
  }

  async existsById(customerId: string): Promise<boolean> {
    return this.customers.some(
      (item) => item.id === customerId && !item.deletedAt,
    );
  }

  async delete(customerId: string): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (item) => item.id === customerId,
    );

    this.customers[customerIndex].deletedAt = new Date();
  }
}
