import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCompanyBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  cnpj?: string;
}
