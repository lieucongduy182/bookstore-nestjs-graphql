import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];

  create(createAuthorInput: CreateAuthorInput): Author {
    const author: Author = {
      id: uuidv4(),
      ...createAuthorInput,
    };
    this.authors.push(author);
    return author;
  }

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: string): Author {
    const author = this.authors.find((a) => a.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  update(id: string, updateAuthorInput: UpdateAuthorInput): Author {
    const authorIndex = this.authors.findIndex((a) => a.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors[authorIndex] = {
      ...this.authors[authorIndex],
      ...updateAuthorInput,
    };
    return this.authors[authorIndex];
  }

  remove(id: string): boolean {
    const authorIndex = this.authors.findIndex((a) => a.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors.splice(authorIndex, 1);
    return true;
  }
}
