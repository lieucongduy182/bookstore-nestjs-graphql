import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field(() => Author)
  author?: Author;

  @Field(() => Int)
  publishedYear: number;

  @Field({ nullable: true })
  description?: string;
}
