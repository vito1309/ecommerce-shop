import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { Category } from "src/cases/categories/category.entity";
import { ProductPhoto } from "../entities/product-photo.entity";

@Injectable()
export class ProductPhotoService {

  constructor(
    @InjectRepository(ProductPhoto)
    private repository: Repository<ProductPhoto>
  ) {}

  findAll(product?: Product | null): Promise<ProductPhoto[]> {
    if (!product) {
      return this.repository.find();
    } else {
      return this.repository.find({
        where: { product: product },
        relations: ['product'],
      });
    }
  }

  save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}