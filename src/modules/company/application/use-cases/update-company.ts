import { Injectable } from '@nestjs/common';
import { Cnpj } from '../entities/cnpj';
import { Company } from '../entities/company';
import { CompaniesRepository } from '../repositories/companies-repository';
import { CompanyAlreadyExists } from './errors/company-already-exists';
import { CompanyNotFound } from './errors/company-not-found';

interface UpdateCompanyRequest {
  id: string;
  name: string;
  cnpj?: string;
}

interface UpdateCompanyResponse {
  company: Company;
}

@Injectable()
export class UpdateCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: UpdateCompanyRequest): Promise<UpdateCompanyResponse> {
    const { id, name, cnpj } = request;

    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new CompanyNotFound();
    }

    company.name = name;

    if (cnpj) {
      const companyExist = await this.companiesRepository.findByCNPJ(cnpj);

      if (companyExist) {
        if (companyExist.id === id) {
          company.cnpj = new Cnpj(cnpj);
        } else {
          throw new CompanyAlreadyExists();
        }
      } else {
        company.cnpj = new Cnpj(cnpj);
      }
    } else {
      company.cnpj = undefined;
    }

    await this.companiesRepository.save(company);

    return {
      company,
    };
  }
}
