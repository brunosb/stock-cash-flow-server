import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { CreateCompany } from '../create-company';

describe('Create company', () => {
  it('should be able to create company without cnpj', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);

    const { company } = await createCompany.execute({
      name: 'Teste 1',
    });

    expect(companiesRepository.companies).toHaveLength(1);
    expect(companiesRepository.companies[0]).toEqual(company);
  });

  it('should be able to create company with cnpj and not exist another with same cnpj', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);

    await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    await createCompany.execute({
      name: 'Teste 2',
      cnpj: '11768308000106',
    });

    expect(companiesRepository.companies).toHaveLength(2);
  });

  it('should not be able to create company with cnpj and exist another with same cnpj', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);

    await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    expect(async () => {
      await createCompany.execute({
        name: 'Teste 2',
        cnpj: '11569344000132',
      });
    }).rejects.toThrowError('Company already exists');
  });
});
