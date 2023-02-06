import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from '../repositories/companies-repository';
import { CompanyNotFound } from './errors/company-not-found';

interface DeleteCompanyRequest {
  companyId: string;
}

type DeleteCompanyResponse = void;

@Injectable()
export class DeleteCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: DeleteCompanyRequest): Promise<DeleteCompanyResponse> {
    const { companyId } = request;

    const isExistsById = await this.companiesRepository.existsById(companyId);

    if (!isExistsById) {
      throw new CompanyNotFound();
    }

    await this.companiesRepository.delete(companyId);
  }
}
