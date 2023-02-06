import { Company } from '../entities/company';

export abstract class CompaniesRepository {
  abstract create(company: Company): Promise<void>;
  abstract save(company: Company): Promise<void>;
  abstract findById(companyId: string): Promise<Company | undefined>;
  abstract existsById(companyId: string): Promise<boolean>;
  abstract existsByCNPJ(companyCNPJ: string): Promise<boolean>;
  abstract delete(companyId: string): Promise<void>;
}
