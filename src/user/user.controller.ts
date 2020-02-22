import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  async create(@Req() req: Request): Promise<User> {
    const user: User = req.body;

    const data = await this.userService.create(user);
    return data;
  }
}
