import { Company } from '@modules/company/application/entities/company';
import { CompaniesRepository } from '@modules/company/application/repositories/companies-repository';

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public companies: Company[] = [];

  async create(company: Company): Promise<void> {
    this.companies.push(company);
  }

  async save(company: Company): Promise<void> {
    const companyIndex = this.companies.findIndex(
      (item) => item.id === company.id && !item.deletedAt,
    );

    if (companyIndex >= 0) {
      this.companies[companyIndex] = company;
    }
  }

  async findById(companyId: string): Promise<Company | undefined> {
    return this.companies.find(
      (item) => item.id === companyId && !item.deletedAt,
    );
  }

  async existsById(companyId: string): Promise<boolean> {
    return this.companies.some(
      (item) => item.id === companyId && !item.deletedAt,
    );
  }

  async existsByCNPJ(companyCNPJ: string): Promise<boolean> {
    return this.companies.some(
      (item) => item.cnpj?.value === companyCNPJ && !item.deletedAt,
    );
  }

  async delete(companyId: string): Promise<void> {
    const companyIndex = this.companies.findIndex(
      (item) => item.id === companyId,
    );

    this.companies[companyIndex].deletedAt = new Date();
  }
}
