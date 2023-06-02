import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import {
  PaginationOptions,
  PaginationResult,
} from 'src/common/pagination.interface';
import { Book } from 'src/schemas/book.schema';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(
    @Query() queryArguments: PaginationOptions,
  ): Promise<PaginationResult<Book[]>> {
    return this.bookService.findAll(queryArguments);
  }
}
