import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.bookRepository.create(createBookInput);
    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async findByAuthorId(authorId: number): Promise<Book[]> {
    return await this.bookRepository.find({
      where: { authorId },
      relations: ['author'],
    });
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    this.bookRepository.merge(book, updateBookInput);
    return await this.bookRepository.save(book);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return true;
  }
}
