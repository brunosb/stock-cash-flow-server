import { CompanyModule } from '@modules/company/company.module';
import { CustomerSupplierModule } from '@modules/customer-supplier/customer-supplier.module';
import { ProductModule } from '@modules/product/product.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CompanyModule, CustomerSupplierModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
