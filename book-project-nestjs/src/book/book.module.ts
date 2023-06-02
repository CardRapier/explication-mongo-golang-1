import { Author, AuthorSchema } from 'src/schemas/author.schema';
import { Book, BookSchema } from 'src/schemas/book.schema';

import { AuthorService } from 'src/author/author.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService, AuthorService],
})
export class BookModule {}
