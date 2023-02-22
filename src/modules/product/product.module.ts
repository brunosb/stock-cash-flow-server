import { Module } from '@nestjs/common';
import { ProductHttpModule } from './infra/http/product-http.module';

@Module({
  imports: [ProductHttpModule],
})
export class ProductModule {}
