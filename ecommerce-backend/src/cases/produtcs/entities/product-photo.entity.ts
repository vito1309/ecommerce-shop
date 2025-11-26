import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Brand } from "src/cases/brands/brand.entity";
import { Product } from "./product.entity";

@Entity('product-photo')
export class ProductPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  path: string;

  @ManyToOne(() => Product)
  product: Product;
}