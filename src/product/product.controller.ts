import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly serviseEntity : ProductService)
    {}

    @Post()
    @UseGuards(JwtAuthGuard)
    ureate(@Body() body)
    {
      return  this.serviseEntity.addproduct(body.name,parseFloat(body.price),body.description);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getById(@Param('id') id: string)
    {
        return this.serviseEntity.findByID(parseInt(id));
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id:string , @Body() body)
    {
      return this.serviseEntity.update(parseInt(id), body.name,parseFloat(body.price),body.description);
    }
    
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string)
    {
      return this.serviseEntity.delete(parseInt(id));
    }
    


}
