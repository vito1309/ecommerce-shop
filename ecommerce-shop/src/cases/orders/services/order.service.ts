import { api } from "../../../lib/axios";
import type { OrderDTO } from "../dtos/order.dtos";


const _ENDPOINT = '/orders';

export const OrderService = {

    async list(userId?: string): Promise<OrderDTO[]> {
        const params = userId ? { userId } : {};
        const result = await api.get(_ENDPOINT, { params });
        return result.data;
    },

    async getById(id: string): Promise<OrderDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    },

    async create(order: Partial<OrderDTO>): Promise<OrderDTO> {
        const result = await api.post(_ENDPOINT, order);
        return result.data;
    },

};