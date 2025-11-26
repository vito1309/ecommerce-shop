import { Brand } from "src/cases/brands/brand.entity";
import { Category } from "src/cases/categories/category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductPhoto } from "./product-photo.entity";


@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  name: string;

  @Column('text', {nullable: true})
  description: string;

  @Column('decimal', {nullable: false, precision: 10, scale: 2})
  price: number;

  @Column('boolean', {nullable: false, default: true})
  active: boolean;

  @ManyToOne(() => Category, {eager: true, nullable: false})
  category: Category;

  @ManyToOne(() => Brand, {eager: true, nullable: true})
  brand: Brand;

  @OneToMany(() => ProductPhoto, (photo) => photo.product, {
    eager: true,
    cascade: true
  })
  photos?: ProductPhoto[];
}