import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { InMemorySuppliersRepository } from '@test/repositories/in-memory-suppliers-repository';
import { CreateSupplier } from '../create-supplier';
import { DeleteSupplier } from '../delete-supplier';
import { SupplierNotFound } from '../errors/supplier-not-found';

describe('Delete supplier', () => {
  it('should be able delete a supplier with id', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );
    const deleteSupplier = new DeleteSupplier(
      suppliersRepository,
      addressesRepository,
    );

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

    await deleteSupplier.execute({ supplierId: supplier.id });

    const supplierIsExistById = await suppliersRepository.existsById(
      supplier.id,
    );
    expect(supplierIsExistById).toBeFalsy();
    expect(addressesRepository.addresses[0].deletedAt).toBeTruthy();
  });

  it('should not be able delete a supplier that does not exist by id', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );
    const deleteSupplier = new DeleteSupplier(
      suppliersRepository,
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

    expect(async () => {
      await deleteSupplier.execute({
        supplierId: '123456789-87987525-5465844',
      });
    }).rejects.toThrow(SupplierNotFound);
  });
});
