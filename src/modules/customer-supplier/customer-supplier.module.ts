import { Module } from '@nestjs/common';
import { CustomerSupplierHttpModule } from './infra/http/customer-supplier-http.module';

@Module({
  imports: [CustomerSupplierHttpModule],
})
export class CustomerSupplierModule {}
