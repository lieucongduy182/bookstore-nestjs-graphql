import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const author = this.authorRepository.create(createAuthorInput);
    return await this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({
      relations: ['books'],
    });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async update(
    id: number,
    updateAuthorInput: UpdateAuthorInput,
  ): Promise<Author> {
    const author = await this.findOne(id);
    this.authorRepository.merge(author, updateAuthorInput);
    return await this.authorRepository.save(author);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return true;
  }
}
