import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';

@ObjectType()
export class Author {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [Book], { nullable: 'itemsAndList' })
  books?: Book;
}
