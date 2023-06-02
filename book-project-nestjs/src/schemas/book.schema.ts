import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Author } from 'src/schemas/author.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  pages: number;

  @Prop({ type: [Types.ObjectId], ref: Author.name })
  authors: Author[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
