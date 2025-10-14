import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  authorId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear() + 1)
  publishedYear: number;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
