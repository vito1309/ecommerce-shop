import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>
  ) {}

  async findAll(userId?: string): Promise<Order[]> {
    if (!userId) {
      return this.repository.find({
        relations: ['customer', 'items', 'items.product'],
      });
    }

    return this.repository.find({
      where: { customer: { id: userId } },
      relations: ['customer', 'items', 'items.product'],
    });
  }

  async findById(id: string): Promise<Order | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['customer', 'items', 'items.product'],
    });
  }

  async save(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
