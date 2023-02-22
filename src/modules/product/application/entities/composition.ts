import { randomUUID } from 'node:crypto';
import { RawMaterial } from './raw-material';

export interface CompositionProps {
  rawMaterial: RawMaterial;
  use: number;
  measure: number;
  make: number;
  partOfProduct: string;
}

export class Composition {
  private _id: string;
  private props: CompositionProps;

  constructor(props: CompositionProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get partOfProduct(): string {
    return this.props.partOfProduct;
  }
  public set partOfProduct(value: string) {
    this.props.partOfProduct = value;
  }

  public get rawMaterial(): RawMaterial {
    return this.props.rawMaterial;
  }
  public set rawMaterial(value: RawMaterial) {
    this.props.rawMaterial = value;
  }

  public get use(): number {
    return this.props.use;
  }
  public set use(value: number) {
    this.props.use = value;
  }

  public get measure(): number {
    return this.props.measure;
  }
  public set measure(value: number) {
    this.props.measure = value;
  }

  public get make(): number {
    return this.props.make;
  }
  public set make(value: number) {
    this.props.make = value;
  }
}
