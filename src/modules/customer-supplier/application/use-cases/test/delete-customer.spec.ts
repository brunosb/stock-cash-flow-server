import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { InMemoryCustomersRepository } from '@test/repositories/in-memory-customers-repository';
import { CreateCustomer } from '../create-customer';
import { DeleteCustomer } from '../delete-customer';
import { CustomerNotFound } from '../errors/customer-not-found';

describe('Delete customer', () => {
  it('should be able delete a customer with id', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      customersRepository,
      companiesRepository,
      addressesRepository,
    );
    const deleteCustomer = new DeleteCustomer(
      customersRepository,
      addressesRepository,
    );

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

    await deleteCustomer.execute({ customerId: customer.id });

    const customerIsExistById = await customersRepository.existsById(
      customer.id,
    );
    expect(customerIsExistById).toBeFalsy();
    expect(addressesRepository.addresses[0].deletedAt).toBeTruthy();
  });

  it('should not be able delete a customer that does not exist by id', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createCustomer = new CreateCustomer(
      customersRepository,
      companiesRepository,
      addressesRepository,
    );
    const deleteCustomer = new DeleteCustomer(
      customersRepository,
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

    expect(async () => {
      await deleteCustomer.execute({
        customerId: '123456789-87987525-5465844',
      });
    }).rejects.toThrow(CustomerNotFound);
  });
});
