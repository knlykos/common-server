import { Controller, Post, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request) {
    const user: User = req.body;
    return await this.authService.login(user);
  }

  @Post('signup')
  async signUp(@Req() req: Request) {
    const user: User = req.body;
    return await this.authService.signUp(user);
  }
  @Get('verification')
  async verification(@Req() req: Request) {
    const token: string = req.query.token;
    return await this.authService.verification(token);
  }

  @Post('password-reset')
  async passwordReset(@Req() req: Request) {
    const user: User = req.body;
    return await this.authService.passwordReset(user);
  }

  @Post('password-reset-request')
  async passwordResetRequest(@Req() req: Request) {
    const user: User = req.body;
    return await this.authService.passwordResetRequest(user);
  }
}
