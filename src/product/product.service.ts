import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import {ProductEntity} from './product.entity'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private productRepository:Repository<ProductEntity>
        )
    {}

   async addproduct(name:string , price:number, description:string) : Promise<number> {
          const product = this.productRepository.create({
                   name,
                   price,
                   description
               });
            const res = await this.productRepository.save(product);
               return res.id;
    }
     async delete (id:number)
     {
         if(await this.productRepository.findOne(id))
         {
            this.productRepository.delete(id);
            return;
         }
         else{
             throw new NotFoundException();
         }
     }
     
     async update(id: number, name: string , price: number, description:string): Promise<void>
     {
         if(await this.productRepository.findOne(id))
         {
            const res = await this.productRepository.update(id, {
                name,
                price,
                description
            })
            return ;
         }
         else{
            throw new NotFoundException();
        }
     }
     
     async findByID(id: number): Promise<ProductEntity>
     {
         const res = await this.productRepository.findOne(id);
        if(res)
        {
            return res;
        }
        else{
            throw new NotFoundException();
        }
     }

}
