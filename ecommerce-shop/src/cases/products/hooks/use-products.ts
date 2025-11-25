import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../services/product.service.ts";
import type { ProductDTO } from "../dtos/product.dto";


export function useProducts(){
    return useQuery<ProductDTO[]>({
        queryKey: ['products'], 
        queryFn: ProductService.list 
    });
}

export function useProduct(id: string){
    return useQuery<ProductDTO>({
        queryKey:['product', id],
        queryFn: () => ProductService.getById(id),
        enabled: !!id 

    });    
}