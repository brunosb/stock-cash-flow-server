import { Replace } from '@helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface AddressProps {
  street: string;
  number: string; //Ex: 35A e 35B
  neighborhood?: string; //complemento
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  additionalInformation?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null | undefined;
}

export class Address {
  private _id: string;
  private props: AddressProps;

  constructor(
    props: Replace<AddressProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public get street(): string {
    return this.props.street;
  }
  public set street(value: string) {
    this.props.street = value;
  }

  public get number(): string {
    return this.props.number;
  }
  public set number(value: string) {
    this.props.number = value;
  }
  public get neighborhood(): string | undefined {
    return this.props.neighborhood;
  }
  public set neighborhood(value: string) {
    this.props.neighborhood = value;
  }
  public get city(): string | undefined {
    return this.props.city;
  }
  public set city(value: string) {
    this.props.city = value;
  }
  public get state(): string | undefined {
    return this.props.state;
  }
  public set state(value: string) {
    this.props.state = value;
  }
  public get zipCode(): string | undefined {
    return this.props.zipCode;
  }
  public set zipCode(value: string) {
    this.props.zipCode = value;
  }
  public get country(): string | undefined {
    return this.props.country;
  }
  public set country(value: string) {
    this.props.country = value;
  }
  public get additionalInformation(): string | undefined {
    return this.props.additionalInformation;
  }
  public set additionalInformation(value: string) {
    this.props.additionalInformation = value;
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
