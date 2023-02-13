import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsEmail,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';

class UpdateAddressBody {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

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

export class UpdateCustomerBody {
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsArray()
  @IsOptional()
  phones?: string[];

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateAddressBody)
  @IsOptional()
  addressRaw?: UpdateAddressBody;
}
