import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { InMemoryCustomersRepository } from '@test/repositories/in-memory-customers-repository';
import { CreateCustomer } from '../create-customer';
import { CustomerAlreadyExists } from '../errors/customer-already-exists';
import { CustomerNotFound } from '../errors/customer-not-found';
import { UpdateCustomer } from '../update-customer';

describe('Update customer', () => {
  it('should be able to update customer a valid fields', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      customersRepository,
      companiesRepository,
      addressesRepository,
    );
    const updateCustomer = new UpdateCustomer(
      customersRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    const { customer: customer1 } = await createCustomer.execute({
      companyId: company.id,
      storeName: 'Cheirinho de Bebê',
      contactName: 'Gervis',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
      },
    });

    const { customer: customer2 } = await createCustomer.execute({
      companyId: company.id,
      storeName: 'Enxoval Moda',
      contactName: 'Gervis',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '40',
      },
    });

    const { customer: customer1Updated } = await updateCustomer.execute({
      id: customer1.id,
      storeName: 'Cheirinho de Bebê Updated',
      contactName: 'Gervis',
      phones: ['85111111111'],
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
        state: 'Ceará',
      },
    });

    const { customer: customer2Updated } = await updateCustomer.execute({
      id: customer2.id,
      storeName: 'Enxoval Moda',
      contactName: 'Fulano',
      phones: ['85111111111'],
      addressRaw: {
        id: customer2.address.id,
        street: 'Rua Barão do rio branco.',
        number: '40',
        state: 'Ceará',
      },
    });

    const { customer: customer3Updated } = await updateCustomer.execute({
      id: customer2.id,
      storeName: 'Enxoval Moda Update',
      contactName: 'Fulano',
      phones: ['85111111111'],
    });

    expect(customer1Updated).toBeTruthy();
    expect(customer2Updated).toBeTruthy();
    expect(customer3Updated).toBeTruthy();
    expect(customersRepository.customers).toHaveLength(2);
  });

  it('should be able to update customer without address', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      customersRepository,
      companiesRepository,
      addressesRepository,
    );
    const updateCustomer = new UpdateCustomer(
      customersRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    const {
      customer: { id },
    } = await createCustomer.execute({
      companyId: company.id,
      storeName: 'Cheirinho de Bebê',
      contactName: 'Gervis',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
      },
    });

    expect(async () => {
      await updateCustomer.execute({
        id,
        storeName: 'Cheirinho de Bebê Updated',
        contactName: 'Gervis',
        phones: ['85111111111'],
      });
    }).toBeTruthy();
  });

  it('should not be able update customer when invalid id', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();

    const updateCustomer = new UpdateCustomer(
      customersRepository,
      addressesRepository,
    );

    expect(async () => {
      await updateCustomer.execute({
        id: '789-456-123',
        storeName: 'Cheirinho de Bebê Updated',
        contactName: 'Gervis',
      });
    }).rejects.toThrow(CustomerNotFound);
  });

  it('should not be able update customer wher storeName is already exist', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      customersRepository,
      companiesRepository,
      addressesRepository,
    );
    const updateCustomer = new UpdateCustomer(
      customersRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    const { customer: customer1 } = await createCustomer.execute({
      companyId: company.id,
      storeName: 'Cheirinho de Bebê',
      contactName: 'Gervis',
    });

    await createCustomer.execute({
      companyId: company.id,
      storeName: 'Enxoval moda',
      contactName: 'Fulano',
    });

    expect(async () => {
      await updateCustomer.execute({
        id: customer1.id,
        storeName: 'Enxoval moda',
        contactName: 'Gervis',
      });
    }).rejects.toThrow(CustomerAlreadyExists);
  });
});
