import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class ProductEntity
{

    @Column()
    name: string;

    @Column()
    price:  number;

    @Column()
    description:  string;
 
    @PrimaryGeneratedColumn()
    id:  number;

}