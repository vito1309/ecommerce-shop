import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { OrderDTO } from "../dtos/order.dtos";
import { OrderService } from "../services/order.service";
import { useAuth } from "@/cases/auth/hooks/use-auth";


export function useOrders() {
    const { user } = useAuth();
    
    return useQuery<OrderDTO[]>({
        queryKey: ['orders', user?.id],
        queryFn: () => OrderService.list(user?.id),
        enabled: !!user?.id
    });
}

export function useOrder(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ['order', id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (order: Partial<OrderDTO>) => OrderService.create(order),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}