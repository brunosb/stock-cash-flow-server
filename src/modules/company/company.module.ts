import { Module } from '@nestjs/common';
import { CompanyHttpModule } from './infra/http/company-http.module';

@Module({
  imports: [CompanyHttpModule],
})
export class CompanyModule {}
