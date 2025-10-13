import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [forwardRef(() => AuthorsModule)],
  providers: [BooksService, BooksResolver],
  exports: [BooksService],
})
export class BooksModule {}
