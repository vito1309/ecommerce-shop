import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { CreateRatingDto } from '../dtos/create-rating.dto';
import { Product } from 'src/cases/produtcs/entities/product.entity';
import { Customer } from 'src/cases/customers/customer.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const product = await this.productRepository.findOne({
      where: { id: createRatingDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const user = await this.customerRepository.findOne({
      where: { id: createRatingDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const rating = this.ratingRepository.create({
      productId: createRatingDto.productId,
      userId: createRatingDto.userId,
      product,
      user,
      rating: createRatingDto.rating,
      comment: createRatingDto.comment,
    });

    return await this.ratingRepository.save(rating);
  }

  async findByProductId(productId: string): Promise<Rating[]> {
    return await this.ratingRepository.find({
      where: { product: { id: productId } },
      order: { createdAt: 'DESC' },
    });
  }

  async getUserRating(userId: string, productId: string): Promise<Rating | null> {
    return await this.ratingRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });
  }
}
