import { Replace } from '@helpers/Replace';
import { Company } from '@modules/company/application/entities/company';
import { randomUUID } from 'node:crypto';
import { Address } from './address';

export interface SupplierProps {
  name: string;
  phones?: string[];
  email?: string;
  address?: Address;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null | undefined;
}

export class Supplier {
  private _id: string;
  private props: SupplierProps;

  constructor(
    props: Replace<SupplierProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      deletedAt: props.deletedAt ?? null,
    };
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this.props.name;
  }
  public set name(value: string) {
    this.props.name = value;
  }

  public get phones(): string[] | undefined {
    return this.props.phones;
  }
  public set phones(value: string[]) {
    this.props.phones = value;
  }

  public get email(): string | undefined {
    return this.props.email;
  }
  public set email(value: string) {
    this.props.email = value;
  }

  public get address(): Address | undefined {
    return this.props.address;
  }
  public set address(value: Address) {
    this.props.address = value;
  }

  public get company(): Company {
    return this.props.company;
  }
  public set company(value: Company) {
    this.props.company = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
  public set deletedAt(deletedAt: Date | null) {
    this.props.deletedAt = deletedAt;
  }
}
