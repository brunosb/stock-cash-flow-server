import { Cnpj } from '../cnpj';

describe('Company CNPJ', () => {
  it('should be able to create a company cnpj', () => {
    const cnpj = new Cnpj('11569344000132');

    expect(cnpj).toBeTruthy();
  });

  it('should not be able to create a company cnpj with difference 14 characters', () => {
    expect(() => new Cnpj('123456789')).toThrow();
  });

  it('should not be able to create a company cnpj with invalid pattern', () => {
    expect(() => new Cnpj('1'.repeat(14))).toThrow();
  });

  it('should be able get value a company cnpj', () => {
    const cnpj = new Cnpj('11569344000132');

    expect(cnpj.value).toBe('11569344000132');
  });
});
