import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { BooksService } from './books.service';
import { AuthorsService } from 'src/authors/authors.service';
import { UpdateBookInput } from './dto/update-book.input';
import { Author } from 'src/authors/entities/author.entity';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Mutation(() => Boolean)
  updateBook(
    @Args('id') id: string,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ) {
    return this.booksService.update(+id, updateBookInput);
  }

  @Mutation(() => Boolean)
  removeBook(@Args('id') id: string) {
    return this.booksService.remove(id);
  }

  @ResolveField(() => Author)
  author(@Parent() book: Book) {
    return this.authorsService.findOne(book.authorId);
  }
}
