import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Product } from "src/cases/produtcs/entities/product.entity";
import { Customer } from "src/cases/customers/customer.entity";

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column('integer', { nullable: false })
  rating: number; // 1-5

  @Column('text', { nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Customer, { eager: true, onDelete: 'CASCADE' })
  user: Customer;
}
