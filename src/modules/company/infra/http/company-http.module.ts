import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { DeleteCompany } from '@modules/company/application/use-cases/delete-company';
import { GetCompany } from '@modules/company/application/use-cases/get-company';
import { Module } from '@nestjs/common';
import { CompanyDatabaseModule } from '../database/company-database.module';
import { CompaniesController } from './controllers/companies.controller';

@Module({
  imports: [CompanyDatabaseModule],
  controllers: [CompaniesController],
  providers: [CreateCompany, GetCompany, DeleteCompany],
})
export class CompanyHttpModule {}
