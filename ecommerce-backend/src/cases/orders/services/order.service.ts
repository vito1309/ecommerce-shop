import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { Customer } from "src/cases/customers/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
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

  async update(id: string, order: Partial<Order>): Promise<Order> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('Order not found');
    }

    const updateData = {
      status: order.status ?? existing.status,
      total: order.total ?? existing.total,
      shipping: order.shipping ?? existing.shipping,
      customer: order.customer ? 
        (typeof order.customer === 'string' ? { id: order.customer } : order.customer) : 
        existing.customer
    };

    const merged = this.repository.merge(existing, updateData);
    await this.repository.save(merged);
    
    // Retorna com as relações carregadas
    return this.findById(id) as Promise<Order>;
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
