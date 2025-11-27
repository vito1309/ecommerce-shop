import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Category } from "../../categories/category.entity";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>
  ) {}

  findAll(category?: Category | null, search?: string): Promise<Product[]> {
    let query = this.repository.createQueryBuilder('product');

    // Adiciona relação de categoria
    query = query.leftJoinAndSelect('product.category', 'category');
    query = query.leftJoinAndSelect('product.brand', 'brand');
    query = query.leftJoinAndSelect('product.photos', 'photos');

    // Filtra por categoria se fornecida
    if (category) {
      query = query.where('product.categoryId = :categoryId', { categoryId: category.id });
    }

    // Filtra por busca (nome ou descrição)
    if (search && search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      query = query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
        { search: searchTerm }
      );
    }

    // Só retorna produtos ativos
    query = query.andWhere('product.active = true');

    return query.getMany();
  }

  findById(id: string): Promise<Product | null> {
    return this.repository.findOneBy({id: id});
  }

  save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}