import { Replace } from '@helpers/Replace';
import { Company } from '@modules/company/application/entities/company';
import { randomUUID } from 'node:crypto';
import { Product } from './product';
import { Variation } from './variation';

export interface KitProps {
  description: string;

  products?: Product[];
  variations?: Variation[];

  cost: number;
  price_wholesale?: number;
  price_retail?: number;
  price_promotional?: number;

  company: Company;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null | undefined;
}

export class Kit {
  private _id: string;
  private props: KitProps;

  constructor(
    props: Replace<
      KitProps,
      { cost?: number; createdAt?: Date; updatedAt?: Date }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      cost: props.cost ?? 0,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      deletedAt: props.deletedAt ?? null,
    };
    this.calculateCost();
  }

  private calculateCost() {
    let sumCost = 0;

    sumCost +=
      this.props.products?.reduce((acc, curr) => {
        acc += curr.cost;
        return acc;
      }, 0) || 0;

    sumCost +=
      this.props.variations?.reduce((acc, curr) => {
        acc += curr.cost;
        return acc;
      }, 0) || 0;

    return sumCost;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get cost(): number {
    return this.props.cost;
  }
  public set cost(value: number) {
    this.props.cost = value;
  }

  public get products(): Product[] | undefined {
    return this.props.products;
  }
  public set products(value: Product[]) {
    this.props.products = value;
    this.calculateCost();
  }

  public get variations(): Variation[] | undefined {
    return this.props.variations;
  }
  public set variations(value: Variation[]) {
    this.props.variations = value;
    this.calculateCost();
  }

  public get price_wholesale(): number | undefined {
    return this.props.price_wholesale;
  }
  public set price_wholesale(value: number) {
    this.props.price_wholesale = value;
  }

  public get price_retail(): number | undefined {
    return this.props.price_retail;
  }
  public set price_retail(value: number) {
    this.props.price_retail = value;
  }

  public get price_promotional(): number | undefined {
    return this.props.price_promotional;
  }
  public set price_promotional(value: number) {
    this.props.price_promotional = value;
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
