import { Injectable } from '@nestjs/common';
import { Cnpj } from '../entities/cnpj';
import { Company } from '../entities/company';
import { CompaniesRepository } from '../repositories/companies-repository';
import { CompanyAlreadyExists } from './errors/company-already-exists';

interface CreateCompanyRequest {
  name: string;
  cnpj?: string;
}

interface CreateCompanyResponse {
  company: Company;
}

@Injectable()
export class CreateCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const { name, cnpj } = request;

    const company = new Company({
      name,
    });

    if (cnpj) {
      const isExistsByCNPJ = await this.companiesRepository.existsByCNPJ(cnpj);

      if (!isExistsByCNPJ) {
        company.cnpj = new Cnpj(cnpj);
      } else {
        throw new CompanyAlreadyExists();
      }
    }

    await this.companiesRepository.create(company);

    return {
      company,
    };
  }
}
