import { CompanyModule } from '@modules/company/company.module';
import { CustomerSupplierModule } from '@modules/customer-supplier/customer-supplier.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CompanyModule, CustomerSupplierModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
