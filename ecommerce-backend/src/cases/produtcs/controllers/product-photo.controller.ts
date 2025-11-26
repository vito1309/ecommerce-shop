import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { validate as isUUID } from 'uuid';
import { ProductService } from "../services/product.service";
import { ProductPhoto } from "../entities/product-photo.entity";
import { ProductPhotoService } from "../services/product-photo.services";

@Controller('productPhotos')
export class ProductPhotoController {

  constructor(
    private readonly ProductService: ProductService,
    private readonly service: ProductPhotoService
  ) {}

  @Get()
  async find(@Query('productId') productId: string): Promise<ProductPhoto[]> {
    if (productId && isUUID(productId)) {
      const product = await this.ProductService.findById(productId);
      return this.service.findAll(product);
    }

    return this.service.findAll();
  }
}

