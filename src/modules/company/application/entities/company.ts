import { Replace } from '@helpers/Replace';
import { randomUUID } from 'node:crypto';
import { Cnpj } from './cnpj';

export interface CompanyProps {
  name: string;
  cnpj?: Cnpj;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null | undefined;
}

export class Company {
  private _id: string;
  private props: CompanyProps;

  constructor(
    props: Replace<CompanyProps, { createdAt?: Date; updatedAt?: Date }>,
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
  public set name(name: string) {
    this.props.name = name;
  }

  public get cnpj(): Cnpj | null | undefined {
    return this.props.cnpj;
  }
  public set cnpj(cnpj: Cnpj) {
    this.props.cnpj = cnpj;
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
