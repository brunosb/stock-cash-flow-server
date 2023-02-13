import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { CompanyNotFound } from '@modules/company/application/use-cases/errors/company-not-found';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { InMemorySuppliersRepository } from '@test/repositories/in-memory-suppliers-repository';
import { CreateSupplier } from '../create-supplier';
import { SupplierAlreadyExists } from '../errors/supplier-already-exists';

describe('Create supplier', () => {
  it('should be able to create supplier', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    await createSupplier.execute({
      companyId: company.id,
      name: 'Casa blanca',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
      },
    });

    expect(suppliersRepository.suppliers).toHaveLength(1);
  });

  it('should not be able to create supplier when not exist companyId valid', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );

    expect(async () => {
      await createSupplier.execute({
        companyId: '5465465468125',
        name: 'Casa blanca',
      });
    }).rejects.toThrow(CompanyNotFound);
  });

  it('should not be able to create supplier when storeName already exist', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    await createSupplier.execute({
      companyId: company.id,
      name: 'Casa blanca',
    });

    expect(async () => {
      await createSupplier.execute({
        companyId: company.id,
        name: 'Casa blanca',
      });
    }).rejects.toThrow(SupplierAlreadyExists);
  });
});
