import { CreateSupplier } from '@modules/customer-supplier/application/use-cases/create-supplier';
import { DeleteSupplier } from '@modules/customer-supplier/application/use-cases/delete-supplier';
import { GetSupplier } from '@modules/customer-supplier/application/use-cases/get-supplier';
import { UpdateSupplier } from '@modules/customer-supplier/application/use-cases/update-supplier';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSupplierBody } from '../dtos/create-supplier-body';
import { UpdateSupplierBody } from '../dtos/update-supplier-body';
import { SupplierViewModel } from '../view-models/supplier-view-model';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private createSupplier: CreateSupplier,
    private updateSupplier: UpdateSupplier,
    private getSupplier: GetSupplier,
    private deleteSupplier: DeleteSupplier,
  ) {}

  @Get(':id')
  async get(@Param('id') supplierId: string) {
    const { supplier } = await this.getSupplier.execute({ supplierId });

    return {
      supplier: SupplierViewModel.toHTTP(supplier),
    };
  }

  @Post()
  async create(@Body() body: CreateSupplierBody) {
    const { supplier } = await this.createSupplier.execute(body);

    return {
      supplier: SupplierViewModel.toHTTP(supplier),
    };
  }

  @Put(':id')
  async update(
    @Param('id') supplierId: string,
    @Body() body: UpdateSupplierBody,
  ) {
    const { supplier } = await this.updateSupplier.execute({
      id: supplierId,
      ...body,
    });

    return {
      supplier: SupplierViewModel.toHTTP(supplier),
    };
  }

  @Delete(':id')
  async delete(@Param('id') supplierId: string) {
    await this.deleteSupplier.execute({ supplierId });
  }
}
