import { Supplier } from '@modules/customer-supplier/application/entities/supplier';

export class SupplierViewModel {
  static toHTTP(supplier: Supplier) {
    return {
      id: supplier.id,
      name: supplier.name,
      phones: supplier.phones,
      email: supplier.email,
      address: supplier.address
        ? {
            id: supplier.address.id,
            street: supplier.address.street,
            number: supplier.address.number,
            neighborhood: supplier.address.neighborhood,
            city: supplier.address.city,
            state: supplier.address.state,
            zipCode: supplier.address.zipCode,
            country: supplier.address.country,
            additionalInformation: supplier.address.additionalInformation,
          }
        : null,
    };
  }
}
