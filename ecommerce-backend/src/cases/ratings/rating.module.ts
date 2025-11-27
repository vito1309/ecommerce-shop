import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { RatingService } from './services/rating.service';
import { RatingController } from './controllers/rating.controller';
import { Product } from '../produtcs/entities/product.entity';
import { Customer } from '../customers/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Product, Customer])],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
