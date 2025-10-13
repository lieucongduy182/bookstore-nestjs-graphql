import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  bio?: string;
}
