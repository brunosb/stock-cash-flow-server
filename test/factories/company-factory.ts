import {
  Company,
  CompanyProps,
} from '@modules/company/application/entities/company';

type Override = Partial<CompanyProps>;

export function makeCompany(override: Override = {}) {
  return new Company({
    name: 'Company',
    ...override,
  });
}
