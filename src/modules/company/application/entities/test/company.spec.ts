import { Cnpj } from '../cnpj';
import { Company } from '../company';

describe('Company', () => {
  it('should be able to create a company without cnpj', () => {
    const company = new Company({
      name: 'Teste01',
    });

    expect(company).toBeTruthy();
  });

  it('should be able to create a company with cnpj', () => {
    const company = new Company({
      name: 'Teste01',
      cnpj: new Cnpj('11569344000132'),
    });

    expect(company).toBeTruthy();
  });
});
