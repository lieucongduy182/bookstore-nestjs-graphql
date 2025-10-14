import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { AuthorsModule } from 'src/authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => AuthorsModule)],
  providers: [BooksService, BooksResolver],
  exports: [BooksService],
})
export class BooksModule {}
