import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { RatingService } from '../services/rating.service';
import { CreateRatingDto } from '../dtos/create-rating.dto';
import { Rating } from '../entities/rating.entity';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return await this.ratingService.create(createRatingDto);
  }

  @Get()
  async findByProduct(@Query('productId') productId: string): Promise<Rating[]> {
    return await this.ratingService.findByProductId(productId);
  }

  @Get('user/:userId/product/:productId')
  async getUserRating(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<Rating | null> {
    return await this.ratingService.getUserRating(userId, productId);
  }
}
