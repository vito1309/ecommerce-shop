import type { CustomerDTO } from "@/cases/customers/dto/customer";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface OrderItemDTO {
    id?: string;
    product: ProductDTO;
    quantity: number;
    value: number; 
}
export interface OrderDTO {
    id?: string;
    custumer: CustomerDTO;
    status: string;
    total: number;
    items: OrderItemDTO[];
    createdAt: Date;
    updatedAt: Date;
}