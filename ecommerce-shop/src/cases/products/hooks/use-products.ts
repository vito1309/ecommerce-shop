import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../services/product.service.ts";
import type { ProductDTO } from "../dtos/product.dto";


export function useProducts(categoryId?: string, search?: string) {
  return useQuery<ProductDTO[]>({
    queryKey: ['products', categoryId ?? 'all', search ?? ''],
    queryFn: async () => {
      const products = await ProductService.list(categoryId, search);
      
      if (search && search.trim()) {
        const searchLower = search.toLowerCase().trim();
        return products.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          (product.description && product.description.toLowerCase().includes(searchLower))
        );
      }
      
      return products;
    },
  });
}

export function useProduct(id: string) {
  return useQuery<ProductDTO>({
    queryKey: ['product', id],
    queryFn: () => ProductService.getById(id),
    enabled: !!id,
  });
}
