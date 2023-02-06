import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { CreateCompany } from '../create-company';
import { DeleteCompany } from '../delete-company';

describe('Delete company', () => {
  it('should be able delete a company with id', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const deleteCompany = new DeleteCompany(companiesRepository);

    const { company } = await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    expect(async () => {
      await deleteCompany.execute({ companyId: company.id });
    }).toBeTruthy();
  });

  it('should not be able delete a company that does not exist by id', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const deleteCompany = new DeleteCompany(companiesRepository);

    await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    expect(async () => {
      await deleteCompany.execute({
        companyId: '123456789-87987525-5465844',
      });
    }).rejects.toThrowError('Company not found');
  });
});
