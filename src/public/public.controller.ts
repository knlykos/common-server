import { Controller, Post, Get } from '@nestjs/common';
import { create } from 'domain';

@Controller('public')
export class PublicController {
  @Get('create')
  create() {
    return 'test';
  }
}
