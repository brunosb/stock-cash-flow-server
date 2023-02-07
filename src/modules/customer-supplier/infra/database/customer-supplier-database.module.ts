import { AddressesRepository } from '@modules/customer-supplier/application/repositories/addresses-repository';
import { CustomersRepository } from '@modules/customer-supplier/application/repositories/customers-repository';
import { SuppliersRepository } from '@modules/customer-supplier/application/repositories/suppliers-repository';
import { Module } from '@nestjs/common';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCustomersRepository } from '@test/repositories/in-memory-customers-repository';
import { InMemorySuppliersRepository } from '@test/repositories/in-memory-suppliers-repository';

@Module({
  providers: [
    {
      provide: CustomersRepository,
      useClass: InMemoryCustomersRepository,
    },
    {
      provide: SuppliersRepository,
      useClass: InMemorySuppliersRepository,
    },
    {
      provide: AddressesRepository,
      useClass: InMemoryAddressesRepository,
    },
  ],
  exports: [CustomersRepository, SuppliersRepository, AddressesRepository],
})
export class CustomerSupplierDatabaseModule {}
