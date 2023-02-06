import { Company } from '@modules/company/application/entities/company';

export class CompanyViewModel {
  static toHTTP(company: Company) {
    return {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj?.value,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }
}
