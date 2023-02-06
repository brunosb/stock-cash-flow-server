import { CompanyModule } from '@modules/company/company.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
