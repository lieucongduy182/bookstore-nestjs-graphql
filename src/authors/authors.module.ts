import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [BooksModule],
  providers: [AuthorsService, AuthorsResolver],
  exports: [AuthorsService],
})
export class AuthorsModule {}
