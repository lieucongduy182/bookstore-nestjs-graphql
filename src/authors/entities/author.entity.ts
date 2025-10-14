import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('authors')
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bio?: string;

  @OneToMany(() => Book, (book) => book.author)
  @Field(() => [Book], { nullable: 'itemsAndList' })
  books?: Book[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @CreateDateColumn()
  @Field()
  updatedAt: Date;
}
