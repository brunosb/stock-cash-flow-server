import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { CompanyNotFound } from '@modules/company/application/use-cases/errors/company-not-found';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { InMemoryCustomersRepository } from '@test/repositories/in-memory-customers-repository';
import { CreateCustomer } from '../create-customer';
import { CustomerAlreadyExists } from '../errors/customer-already-exists';

describe('Create customer', () => {
  it('should be able to create customer', async () => {
    const costumersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      costumersRepository,
      companiesRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    await createCustomer.execute({
      companyId: company.id,
      storeName: 'Cheirinho de Bebê',
      contactName: 'Gervis',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
      },
    });

    expect(costumersRepository.customers).toHaveLength(1);
  });

  it('should not be able to create customer when not exist companyId valid', async () => {
    const costumersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCustomer = new CreateCustomer(
      costumersRepository,
      companiesRepository,
      addressesRepository,
    );

    expect(async () => {
      await createCustomer.execute({
        companyId: '5465465468125',
        storeName: 'Cheirinho de Bebê',
        contactName: 'Gervis',
      });
    }).rejects.toThrow(CompanyNotFound);
  });

  it('should not be able to create customer when storeName already exist', async () => {
    const costumersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      costumersRepository,
      companiesRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    await createCustomer.execute({
      companyId: company.id,
      storeName: 'Cheirinho de Bebê',
      contactName: 'Gervis',
    });

    expect(async () => {
      await createCustomer.execute({
        companyId: company.id,
        storeName: 'Cheirinho de Bebê',
        contactName: 'Gervis',
      });
    }).rejects.toThrow(CustomerAlreadyExists);
  });
});
