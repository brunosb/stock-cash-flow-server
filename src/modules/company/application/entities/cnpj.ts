import { CnpjNotValid } from '../use-cases/errors/cnpj-not-valid';

export class Cnpj {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length === 14;
  }

  private validatePattern(content: string): boolean {
    content = content.replace(/[^\d]+/g, '');

    if (
      content === '00000000000000' ||
      content === '11111111111111' ||
      content === '22222222222222' ||
      content === '33333333333333' ||
      content === '44444444444444' ||
      content === '55555555555555' ||
      content === '66666666666666' ||
      content === '77777777777777' ||
      content === '88888888888888' ||
      content === '99999999999999'
    )
      return false;

    // Valida primeiro dígito verificador
    let size = content.length - 2;
    let numbers = content.substring(0, size);
    const digits = content.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += Number(numbers[size - i]) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits[0])) return false;

    // Valida segundo dígito verificador
    size = size + 1;
    numbers = content.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += Number(numbers[size - i]) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === Number(digits[1]);
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);
    const isContentPatternValid = this.validatePattern(content);

    if (!isContentLengthValid || !isContentPatternValid) {
      throw new CnpjNotValid();
    }

    this.content = content;
  }
}
