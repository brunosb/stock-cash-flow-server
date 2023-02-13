import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsEmail,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';

class CreateAddressBody {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  neighborhood?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  additionalInformation?: string;
}

export class CreateSupplierBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  phones?: string[];

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressBody)
  @IsOptional()
  addressRaw?: CreateAddressBody;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}
