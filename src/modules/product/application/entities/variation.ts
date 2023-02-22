import { Replace } from '@helpers/Replace';
import { calculateCostOfCompositions } from '@modules/product/helpers/calculate-cost-of-compositions';
import { randomUUID } from 'node:crypto';
import { Composition } from './composition';

export interface VariationProps {
  nameVariation1: string;
  nameVariation2?: string;
  nameVariation3?: string;
  barcode?: string;

  cost: number;
  price_wholesale: number;
  price_retail: number;
  price_promotional: number;

  compositions?: Composition[];
}

export class Variation {
  private _id: string;
  private props: VariationProps;

  constructor(props: Replace<VariationProps, { cost?: number }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      cost: props.cost ?? 0,
    };

    if (this.props.compositions) {
      this.cost = calculateCostOfCompositions(this.props.compositions);
    }
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get nameVariation1(): string {
    return this.props.nameVariation1;
  }
  public set nameVariation1(value: string) {
    this.props.nameVariation1 = value;
  }

  public get nameVariation2(): string {
    return this.props.nameVariation2;
  }
  public set nameVariation2(value: string) {
    this.props.nameVariation2 = value;
  }

  public get nameVariation3(): string {
    return this.props.nameVariation3;
  }
  public set nameVariation3(value: string) {
    this.props.nameVariation3 = value;
  }

  public get barcode(): string {
    return this.props.barcode;
  }
  public set barcode(value: string) {
    this.props.barcode = value;
  }

  public get cost(): number {
    return this.props.cost;
  }
  public set cost(value: number) {
    this.props.cost = value;
  }

  public get price_wholesale(): number {
    return this.props.price_wholesale;
  }
  public set price_wholesale(value: number) {
    this.props.price_wholesale = value;
  }

  public get price_retail(): number {
    return this.props.price_retail;
  }
  public set price_retail(value: number) {
    this.props.price_retail = value;
  }

  public get price_promotional(): number {
    return this.props.price_promotional;
  }
  public set price_promotional(value: number) {
    this.props.price_promotional = value;
  }

  public get compositions(): Composition[] | undefined {
    return this.props.compositions;
  }
  public set compositions(value: Composition[]) {
    this.props.compositions = value;
    this.cost = calculateCostOfCompositions(value);
  }
}
