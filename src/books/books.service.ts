import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  create(createBookInput: CreateBookInput): Book {
    const book: Book = {
      id: uuidv4(),
      ...createBookInput,
      authorId: createBookInput.authorId,
      publishedYear: createBookInput.publishedYear,
    };

    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: string): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  findByAuthorId(authorId: string): Book[] {
    return this.books.filter((b) => b.authorId === authorId);
  }

  update(id: string, updateBookInput: UpdateBookInput): Book {
    const bookIndex = this.books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updateBookInput,
    };
    return this.books[bookIndex];
  }

  remove(id: string): boolean {
    const bookIndex = this.books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
    return true;
  }
}
