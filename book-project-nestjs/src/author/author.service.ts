import { Injectable } from '@nestjs/common';
import { Author } from 'src/schemas/author.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}
  async createMultiple(authors: any) {
    const response = await this.authorModel.insertMany<Author>(authors);
    return response;
  }
}
