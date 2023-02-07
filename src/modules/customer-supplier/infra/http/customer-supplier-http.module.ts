import { Module } from '@nestjs/common';
import { CustomerSupplierDatabaseModule } from '../database/customer-supplier-database.module';

@Module({
  imports: [CustomerSupplierDatabaseModule],
  controllers: [],
  providers: [],
})
export class CustomerSupplierHttpModule {}
