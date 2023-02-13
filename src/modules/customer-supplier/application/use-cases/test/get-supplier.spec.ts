import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { InMemorySuppliersRepository } from '@test/repositories/in-memory-suppliers-repository';
import { CreateSupplier } from '../create-supplier';
import { SupplierNotFound } from '../errors/supplier-not-found';
import { GetSupplier } from '../get-supplier';

describe('Get supplier', () => {
  it('should be able get a supplier with id', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );
    const getSupplier = new GetSupplier(suppliersRepository);

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    const { supplier } = await createSupplier.execute({
      companyId: company.id,
      name: 'Casa blanca',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
      },
    });

    const { supplier: supplierFinded } = await getSupplier.execute({
      supplierId: supplier.id,
    });

    expect(supplier).toEqual(supplierFinded);
  });

  it('should not be able get a supplier that does not exist by id', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );
    const getSupplier = new GetSupplier(suppliersRepository);

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

    expect(async () => {
      await getSupplier.execute({
        supplierId: '4654646-54-654-654-54546',
      });
    }).rejects.toThrow(SupplierNotFound);
  });
});
