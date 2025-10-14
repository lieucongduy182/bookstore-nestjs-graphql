import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { BooksModule } from 'src/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), BooksModule],
  providers: [AuthorsService, AuthorsResolver],
  exports: [AuthorsService],
})
export class AuthorsModule {}
