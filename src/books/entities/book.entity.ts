import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  authorId: number;

  @ManyToOne(() => Author, (author) => author.books, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Author)
  author?: typeof Author;

  @Column()
  @Field(() => Int)
  publishedYear: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @CreateDateColumn()
  @Field()
  updatedAt: Date;
}
