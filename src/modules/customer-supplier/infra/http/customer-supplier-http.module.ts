import { CompanyDatabaseModule } from '@modules/company/infra/database/company-database.module';
import { CreateCustomer } from '@modules/customer-supplier/application/use-cases/create-customer';
import { CreateSupplier } from '@modules/customer-supplier/application/use-cases/create-supplier';
import { DeleteCustomer } from '@modules/customer-supplier/application/use-cases/delete-customer';
import { DeleteSupplier } from '@modules/customer-supplier/application/use-cases/delete-supplier';
import { GetCustomer } from '@modules/customer-supplier/application/use-cases/get-customer';
import { GetSupplier } from '@modules/customer-supplier/application/use-cases/get-supplier';
import { UpdateCustomer } from '@modules/customer-supplier/application/use-cases/update-customer';
import { UpdateSupplier } from '@modules/customer-supplier/application/use-cases/update-supplier';
import { Module } from '@nestjs/common';
import { CustomerSupplierDatabaseModule } from '../database/customer-supplier-database.module';
import { CustomersController } from './controllers/customers.controller';
import { SuppliersController } from './controllers/suppliers.controller';

@Module({
  imports: [CompanyDatabaseModule, CustomerSupplierDatabaseModule],
  controllers: [CustomersController, SuppliersController],
  providers: [
    CreateCustomer,
    UpdateCustomer,
    GetCustomer,
    DeleteCustomer,
    CreateSupplier,
    UpdateSupplier,
    GetSupplier,
    DeleteSupplier,
  ],
})
export class CustomerSupplierHttpModule {}
