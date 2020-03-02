import {
  Controller,
  Post,
  Req,
  Get,
  Put,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { OkResponse } from 'src/common/resposes/ok.response';
import { UnexpectedErrorException } from 'src/common/exceptions/unexpected.error.exception';

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
    try {
      const response = await this.authService.signUp(user);

      return response.getResponse();
    } catch (error) {
      throw error;
    }
  }
  @Get('verification')
  async verification(@Req() req: Request) {
    const token: string = req.query.token;
    try {
      const result = await this.authService.verification(token);
      Logger.log(result.getMessage());
      return result;
    } catch (error) {
      Logger.error(error.getResponse().message);
      return error.getResponse();
    }
  }

  @Put('password-reset')
  async passwordReset(@Req() req: Request) {
    const user: User = req.body;
    try {
      const response = await this.authService.passwordReset(user);
      return response.getResponse();
    } catch (error) {
      console.log(error);
    }
  }

  @Post('password-reset-request')
  async passwordResetRequest(@Req() req: Request) {
    const user: User = req.body;
    return await this.authService.passwordResetRequest(user);
  }
  @Get('token-verification')
  async tokenVerification(@Req() req: Request) {
    const token = req.query.token;
    try {
      const payload = await this.authService.tokenVerification(token);

      return new OkResponse(payload).getResponse();
    } catch (error) {
      return new UnauthorizedException(error.message).getResponse();
    }
  }
}
