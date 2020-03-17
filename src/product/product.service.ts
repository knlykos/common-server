import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    let productResultSet: Product;
    try {
      this.productRepository.save(product);
    } catch (error) {}
    return productResultSet;
  }
}
