import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  cnpj?: string;
}
