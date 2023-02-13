import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { CreateCompany } from '../create-company';
import { CompanyAlreadyExists } from '../errors/company-already-exists';
import { CompanyNotFound } from '../errors/company-not-found';
import { UpdateCompany } from '../update-company';

describe('Update company', () => {
  it('should be able to update company without cnpj', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const updateCompany = new UpdateCompany(companiesRepository);

    const { company } = await createCompany.execute({
      name: 'Company 1',
    });

    const companyUpdated = await updateCompany.execute({
      id: company.id,
      name: 'Company 1 Updated',
    });

    expect(companiesRepository.companies).toHaveLength(1);
    expect(companiesRepository.companies[0]).toEqual(companyUpdated.company);
  });

  it('should be able to update company with cnpj and not exist another with same cnpj', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const updateCompany = new UpdateCompany(companiesRepository);

    const { company } = await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    const { company: company2 } = await createCompany.execute({
      name: 'Teste 2',
      cnpj: '11768308000106',
    });

    await updateCompany.execute({
      id: company.id,
      name: 'Teste 1',
      cnpj: '06753124000124',
    });

    await updateCompany.execute({
      id: company2.id,
      name: 'Test 2 Updated',
    });

    expect(companiesRepository.companies).toHaveLength(2);
    expect(companiesRepository.companies[1].cnpj).toBeFalsy();
  });

  it('should be able to update company with cnpj is equal a old version company', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const updateCompany = new UpdateCompany(companiesRepository);

    const { company } = await createCompany.execute({
      name: 'Teste',
      cnpj: '11569344000132',
    });

    expect(async () => {
      await updateCompany.execute({
        id: company.id,
        name: 'Teste Updated',
        cnpj: '11569344000132',
      });
    }).toBeTruthy();
  });

  it('should be able to update company with cnpj is different a old version company', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const updateCompany = new UpdateCompany(companiesRepository);

    const { company } = await createCompany.execute({
      name: 'Teste',
      cnpj: '11569344000132',
    });

    expect(async () => {
      await updateCompany.execute({
        id: company.id,
        name: 'Teste Updated',
        cnpj: '78449853000100',
      });
    }).toBeTruthy();
  });

  it('should be able to update company when change cnpj and cnpj already exist by current company update', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const updateCompany = new UpdateCompany(companiesRepository);

    const { company } = await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    const { company: companyUpdated } = await updateCompany.execute({
      id: company.id,
      name: 'Teste 1 Updated',
      cnpj: '11569344000132',
    });

    expect(companyUpdated).toBeTruthy();
  });

  it('should not be able to update company with cnpj and exist another with same cnpj', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompany(companiesRepository);
    const updateCompany = new UpdateCompany(companiesRepository);

    await createCompany.execute({
      name: 'Teste 1',
      cnpj: '11569344000132',
    });

    const { company } = await createCompany.execute({
      name: 'Teste 2',
      cnpj: '11768308000106',
    });

    expect(async () => {
      await updateCompany.execute({
        id: company.id,
        name: 'Teste 2',
        cnpj: '11569344000132',
      });
    }).rejects.toThrow(CompanyAlreadyExists);
  });

  it('should not be able update company with id non exist', async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const updateCompany = new UpdateCompany(companiesRepository);

    expect(async () => {
      await updateCompany.execute({
        id: '789-456-321',
        name: 'Teste',
      });
    }).rejects.toThrow(CompanyNotFound);
  });
});
