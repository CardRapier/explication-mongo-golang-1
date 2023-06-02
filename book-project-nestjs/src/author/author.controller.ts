import { AuthorService } from './author.service';
import { Controller } from '@nestjs/common';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
}
