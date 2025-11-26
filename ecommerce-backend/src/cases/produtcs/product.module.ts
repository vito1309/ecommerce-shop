import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";
import { CategoryModule } from "../categories/category.module";
import { ProductPhoto } from "./entities/product-photo.entity";
import { ProductPhotoService } from "./services/product-photo.services";
import { ProductPhotoController } from "./controllers/product-photo.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductPhoto]),
    CategoryModule
  ],
  providers: [ProductService, ProductPhotoService],
  controllers: [ProductController, ProductPhotoController]
})
export class ProductModule {}