import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { InMemoryCustomersRepository } from '@test/repositories/in-memory-customers-repository';
import { CreateCustomer } from '../create-customer';
import { CustomerNotFound } from '../errors/customer-not-found';
import { GetCustomer } from '../get-customer';

describe('Get customer', () => {
  it('should be able get a customer with id', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      customersRepository,
      companiesRepository,
      addressesRepository,
    );
    const getCustomer = new GetCustomer(customersRepository);

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    const { customer } = await createCustomer.execute({
      companyId: company.id,
      storeName: 'Cheirinho de Bebê',
      contactName: 'Gervis',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
      },
    });

    const { customer: customerFinded } = await getCustomer.execute({
      customerId: customer.id,
    });

    expect(customer).toEqual(customerFinded);
  });

  it('should not be able get a customer that does not exist by id', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      customersRepository,
      companiesRepository,
      addressesRepository,
    );
    const getCustomer = new GetCustomer(customersRepository);

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

    expect(async () => {
      await getCustomer.execute({
        customerId: '4654646-54-654-654-54546',
      });
    }).rejects.toThrow(CustomerNotFound);
  });
});
