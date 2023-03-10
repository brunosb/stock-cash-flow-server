import { CreateCompany } from '@modules/company/application/use-cases/create-company';
import { DeleteCompany } from '@modules/company/application/use-cases/delete-company';
import { GetCompany } from '@modules/company/application/use-cases/get-company';
import { UpdateCompany } from '@modules/company/application/use-cases/update-company';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCompanyBody } from '../dtos/create-company-body';
import { UpdateCompanyBody } from '../dtos/update-company-body';
import { CompanyViewModel } from '../view-models/company-view-model';

@Controller('companies')
export class CompaniesController {
  constructor(
    private createCompany: CreateCompany,
    private updateCompany: UpdateCompany,
    private getCompany: GetCompany,
    private deleteCompany: DeleteCompany,
  ) {}

  @Get(':id')
  async get(@Param('id') companyId: string) {
    const { company } = await this.getCompany.execute({ companyId });

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Post()
  async create(@Body() body: CreateCompanyBody) {
    const { name, cnpj } = body;

    const { company } = await this.createCompany.execute({
      name,
      cnpj,
    });

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Put(':id')
  async update(
    @Param('id') companyId: string,
    @Body() body: UpdateCompanyBody,
  ) {
    const { name, cnpj } = body;

    const { company } = await this.updateCompany.execute({
      id: companyId,
      name,
      cnpj,
    });

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Delete(':id')
  async delete(@Param('id') companyId: string) {
    await this.deleteCompany.execute({ companyId });
  }
}
