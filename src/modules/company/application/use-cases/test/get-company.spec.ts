import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { CreateCompany } from '../create-company';
import { GetCompany } from '../get-company';

describe('Get company', () => {
  it('should be able get a company with id', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const getCompany = new GetCompany(companiesRepository);

    const { company } = await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    const { company: companyFinded } = await getCompany.execute({
      companyId: company.id,
    });

    expect(company).toEqual(companyFinded);
  });

  it('should not be able get a company that does not exist by id', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const getCompany = new GetCompany(companiesRepository);

    await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    expect(async () => {
      await getCompany.execute({
        companyId: '123456789-87987525-5465844',
      });
    }).rejects.toThrowError('Company not found');
  });
});
