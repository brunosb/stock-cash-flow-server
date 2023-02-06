import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company';
import { CompaniesRepository } from '../repositories/companies-repository';
import { CompanyNotFound } from './errors/company-not-found';

interface GetCompanyRequest {
  companyId: string;
}

interface GetCompanyResponse {
  company: Company;
}

@Injectable()
export class GetCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: GetCompanyRequest): Promise<GetCompanyResponse> {
    const { companyId } = request;

    const company = await this.companiesRepository.findById(companyId);

    if (!company) {
      throw new CompanyNotFound();
    }

    return {
      company,
    };
  }
}
