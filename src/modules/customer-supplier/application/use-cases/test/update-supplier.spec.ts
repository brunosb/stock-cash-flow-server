import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { InMemoryAddressesRepository } from '@test/repositories/in-memory-adresses-repository';
import { InMemoryCompaniesRepository } from '@test/repositories/in-memory-companies-repository';
import { InMemorySuppliersRepository } from '@test/repositories/in-memory-suppliers-repository';
import { CreateSupplier } from '../create-supplier';
import { SupplierAlreadyExists } from '../errors/supplier-already-exists';
import { SupplierNotFound } from '../errors/supplier-not-found';
import { UpdateSupplier } from '../update-supplier';

describe('Update supplier', () => {
  it('should be able to update supplier a valid fields', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );
    const updateSupplier = new UpdateSupplier(
      suppliersRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    const { supplier: supplier1 } = await createSupplier.execute({
      companyId: company.id,
      name: 'Casa blanca',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
      },
    });

    const { supplier: supplier2 } = await createSupplier.execute({
      companyId: company.id,
      name: 'Casa blanca 2',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '40',
      },
    });

    const { supplier: supplier1Updated } = await updateSupplier.execute({
      id: supplier1.id,
      name: 'Casa blanca Update',
      phones: ['85111111111'],
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
        state: 'Ceará',
      },
    });

    const { supplier: supplier2Updated } = await updateSupplier.execute({
      id: supplier2.id,
      name: 'Tecideira',
      phones: ['85111111111'],
      addressRaw: {
        id: supplier2.address.id,
        street: 'Rua Barão do rio branco.',
        number: '40',
        state: 'Ceará',
      },
    });

    const { supplier: supplier3Updated } = await updateSupplier.execute({
      id: supplier2.id,
      name: 'Tecideira Updated',
      phones: ['85111111111'],
    });

    expect(supplier1Updated).toBeTruthy();
    expect(supplier2Updated).toBeTruthy();
    expect(supplier3Updated).toBeTruthy();
    expect(suppliersRepository.suppliers).toHaveLength(2);
  });

  it('should be able to update supplier without address', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );
    const updateSupplier = new UpdateSupplier(
      suppliersRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    const {
      supplier: { id },
    } = await createSupplier.execute({
      companyId: company.id,
      name: 'Casa blanca',
      addressRaw: {
        street: 'Rua Barão do rio branco.',
        number: '35',
      },
    });

    expect(async () => {
      await updateSupplier.execute({
        id,
        name: 'Casa blanca Updated',
        phones: ['85111111111'],
      });
    }).toBeTruthy();
  });

  it('should not be able update supplier when invalid id', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();

    const updateSupplier = new UpdateSupplier(
      suppliersRepository,
      addressesRepository,
    );

    expect(async () => {
      await updateSupplier.execute({
        id: '789-456-123',
        name: 'Casa blanca',
      });
    }).rejects.toThrow(SupplierNotFound);
  });

  it('should not be able update supplier wher storeName is already exist', async () => {
    const suppliersRepository = new InMemorySuppliersRepository();
    const addressesRepository = new InMemoryAddressesRepository();
    const companiesRepository = new InMemoryCompaniesRepository();

    const createCompany = new CreateCompany(companiesRepository);
    const createSupplier = new CreateSupplier(
      suppliersRepository,
      companiesRepository,
      addressesRepository,
    );
    const updateSupplier = new UpdateSupplier(
      suppliersRepository,
      addressesRepository,
    );

    const { company } = await createCompany.execute({
      name: 'Company1',
    });

    const { supplier: supplier1 } = await createSupplier.execute({
      companyId: company.id,
      name: 'Casa blanca',
    });

    await createSupplier.execute({
      companyId: company.id,
      name: 'Casa blanca 2',
    });

    expect(async () => {
      await updateSupplier.execute({
        id: supplier1.id,
        name: 'Casa blanca 2',
      });
    }).rejects.toThrow(SupplierAlreadyExists);
  });
});
