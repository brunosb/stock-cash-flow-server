import { CompaniesRepository } from '@modules/company/application/repositories/companies-repository';
import { Module } from '@nestjs/common';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';

@Module({
  providers: [
    {
      provide: CompaniesRepository,
      useClass: InMemoryCompaniesRepository,
    },
  ],
  exports: [CompaniesRepository],
})
export class CompanyDatabaseModule {}
