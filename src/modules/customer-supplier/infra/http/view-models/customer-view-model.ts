import { Customer } from '@modules/customer-supplier/application/entities/customer';

export class CustomerViewModel {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id,
      storeName: customer.storeName,
      contactName: customer.contactName,
      phones: customer.phones,
      email: customer.email,
      address: customer.address
        ? {
            id: customer.address.id,
            street: customer.address.street,
            number: customer.address.number,
            neighborhood: customer.address.neighborhood,
            city: customer.address.city,
            state: customer.address.state,
            zipCode: customer.address.zipCode,
            country: customer.address.country,
            additionalInformation: customer.address.additionalInformation,
          }
        : null,
    };
  }
}
