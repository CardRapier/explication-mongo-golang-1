import { CreateBookDto } from './dto/create-book.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaginationOptions,
  PaginationResult,
} from 'src/common/pagination.interface';
import { Author } from 'src/schemas/author.schema';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @Inject(AuthorService) private authorService: AuthorService,
  ) {}
  async create(data: CreateBookDto) {
    const { authors, ...bookData } = data;
    const book = new this.bookModel({
      ...bookData,
    });
    book.authors ||= [];
    const newAuthors = authors.map((author) => ({ ...author, book: book.id }));
    const bookAuthors: Author[] = await this.authorService.createMultiple(
      newAuthors,
    );
    book.authors.push(...bookAuthors);
    return await book.save();
  }

  async findAll(
    queryArguments: PaginationOptions,
  ): Promise<PaginationResult<Book[]>> {
    let { page, name } = queryArguments;
    page ||= 1;
    name ||= '';

    const total = await this.bookModel.count({ name: { $regex: name } });
    const pages = Math.ceil(total / 20);
    const skip = (queryArguments.page - 1) * 20;
    const results = await this.bookModel
      .find<Book>({ name: { $regex: name } })
      .skip(skip)
      .limit(20)
      .populate('authors');
    const count = results.length;
    const data: PaginationResult<Book[]> = {
      total,
      count,
      page,
      pages: pages === 0 ? 1 : pages,
      results,
    };

    return data;
  }
}
