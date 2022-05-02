import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
 constructor(
     @InjectRepository(UsersEntity) private usersRepository:Repository<UsersEntity>
     )
 {}
    async  createUsers(firstName: string,lastName:  string, email   :  string,password:  string)
    {
        
        const existingUser = await this.findByEmail(email);
        if(existingUser)
        {
            throw new Error('Use other email');
        }
        const hash = await bcrypt.hash(password, parseInt(process.env.SOLT));
       const user = this.usersRepository.create({
            firstName,
            lastName,
            email,
            password: hash,
        })
        return await this.usersRepository.save(user)
    }
    async findByEmail(email: string) : Promise<UsersEntity>
    {
        const user = await this.usersRepository.findOne(
            {
                where: {
                    email,
                }
            }
        )

        return user;
    }
    


    
}