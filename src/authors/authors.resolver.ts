import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/book.entity';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorsService.create(createAuthorInput);
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Mutation(() => Boolean)
  removeAuthor(@Args('id') id: string) {
    return this.authorsService.remove(id);
  }

  @ResolveField(() => [Book])
  books(@Parent() author: Author) {
    return this.booksService.findByAuthorId(author.id);
  }
}
