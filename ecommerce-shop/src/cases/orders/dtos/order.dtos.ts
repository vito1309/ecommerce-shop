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
    custumer?: CustomerDTO;
    customer?: CustomerDTO;
    userId?: string;
    status: string;
    total: number;
    shipping?: number;
    items?: OrderItemDTO[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrderStatusInfo {
    value: string;
    label: string;
    bg: string;
    border: string;
    text: string;
}

export const OrderStatus: OrderStatusInfo[] = [
    {
        value: 'NEW',
        label: 'Novo',
        bg: 'bg-blue-100',
        border: 'border-blue-300',
        text: 'text-blue-800'
    },
    {
        value: 'SEPARATION',
        label: 'Separando',
        bg: 'bg-yellow-100',
        border: 'border-yellow-300',
        text: 'text-yellow-800'
    },
    {
        value: 'INVOICED',
        label: 'Faturado',
        bg: 'bg-purple-100',
        border: 'border-purple-300',
        text: 'text-purple-800'
    },
    {
        value: 'SHIPPED',
        label: 'Enviado',
        bg: 'bg-indigo-100',
        border: 'border-indigo-300',
        text: 'text-indigo-800'
    },
    {
        value: 'DELIVERED',
        label: 'Entregue',
        bg: 'bg-green-100',
        border: 'border-green-300',
        text: 'text-green-800'
    },
    {
        value: 'CANCELADO',
        label: 'Cancelado',
        bg: 'bg-red-100',
        border: 'border-red-300',
        text: 'text-red-800'
    }
];