import { randomUUID } from 'node:crypto';
import { Company } from '@modules/company/application/entities/company';
import { Customer } from '@modules/customer-supplier/application/entities/customer';
import { Replace } from '@helpers/Replace';

type UnitOfMeasure = 'KG ' | 'METER ' | 'LITER ' | 'UNIT';

export interface RawMaterialProps {
  description: string;

  yield: number;
  yieldUnit: UnitOfMeasure;

  lastPrice: number;
  lastCustomer: Customer;
  lastDate: Date;

  unitPrice: number;

  company: Company;
}

export class RawMaterial {
  private _id: string;
  private props: RawMaterialProps;

  constructor(
    props: Replace<RawMaterialProps, { lastDate?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      lastDate: props.lastDate ?? new Date(),
    };
    this.calculateUnitPrice();
  }

  private calculateUnitPrice() {
    const unitPrice = this.props.lastPrice / this.props.yield;
    try {
      this.props.unitPrice = parseFloat(unitPrice.toFixed(2));
    } catch (error) {
      throw new Error(
        `Error calculate unitPrice in raw-material: ${
          (error as Error).message
        }`,
      );
    }
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get description(): string {
    return this.props.description;
  }
  public set description(value: string) {
    this.props.description = value;
  }

  public get unitPrice(): number {
    return this.props.unitPrice;
  }

  public get yield(): number {
    return this.props.yield;
  }
  public set yield(value: number) {
    this.props.yield = value;
    this.calculateUnitPrice();
  }

  public get yieldUnit(): UnitOfMeasure {
    return this.props.yieldUnit;
  }
  public set yieldUnit(value: UnitOfMeasure) {
    this.props.yieldUnit = value;
  }

  public get lastPrice(): number {
    return this.props.lastPrice;
  }
  public set lastPrice(value: number) {
    this.props.lastPrice = value;
    this.calculateUnitPrice();
  }

  public get lastDate(): Date {
    return this.props.lastDate;
  }
  public set lastDate(value: Date) {
    this.props.lastDate = value;
  }

  public get lastCustomer(): Customer {
    return this.props.lastCustomer;
  }
  public set lastCustomer(value: Customer) {
    this.props.lastCustomer = value;
  }

  public get company(): Company {
    return this.props.company;
  }
  public set company(value: Company) {
    this.props.company = value;
  }
}
