import {
  Injectable,
  Logger,
  ConflictException,
  InternalServerErrorException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as cryptoRandomString from 'crypto-random-string';
import { User } from 'src/entities/user.entity';
import { ResponseApi } from 'src/common/objects/response.api';
import { MailerService } from '@nest-modules/mailer';
import { VerificationTemplate } from 'src/models/verification.template.model';
import { environment } from './../enviroments/environment';
import { emailConstants } from './../common/constants/email.constants';
import { DatabaseErrorException } from 'src/common/exceptions/database.error.exception';
import { DataErrorException } from 'src/common/exceptions/data.error.exception';
import { OkResponse } from 'src/common/resposes/ok.response';
import { UnexpectedErrorException } from 'src/common/exceptions/unexpected.error.exception';

export interface AccessToken {
  accessToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  // TODO: Implementar usarname
  async login(user: any) {
    // const payload = { username: user.username, sub: user.userId };
    const response = new OkResponse<{ accessToken: string }>();
    let payload = {};
    try {
      const passwordMatchRes = await this.usersService.passwordMatch(user);
      const userData = passwordMatchRes.userData;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      if (passwordMatchRes.passwordMatch) {
        payload = {
          username: userData.id,
          sub: userData.id,
          name: `${userData.name} ${userData.lastname}`,
        };
        response.setResponse({
          data: { accessToken: this.jwtService.sign(payload) },
          message: 'login successful',
          statusCode: 200,
        });
        return response;
      } else {
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
    // eslint-disable-next-line prefer-const
  }

  async signUp(user: User): Promise<OkResponse<User>> {
    let verificationTemplate: VerificationTemplate;
    const response = new OkResponse<User>();
    const randomString = cryptoRandomString({ length: 30 });
    user.activationToken = randomString;
    try {
      const userResultSet = await this.usersService.create(user);
      response.setData({
        activationToken: userResultSet.activationToken,
        id: userResultSet.id,
        email: userResultSet.email,
        name: userResultSet.name,
        lastname: userResultSet.lastname,
      });

      try {
        verificationTemplate = {
          activationURL:
            environment.apiUrl +
            '/auth/verification?token=' +
            response.getData().activationToken,
          completeName:
            response.getData().name + ' ' + response.getData().lastname,
        };

        await this.mailerService.sendMail({
          to: response.getData().email,
          from: emailConstants.from,
          subject: 'Registro exitoso',
          template: 'signup',
          context: verificationTemplate,
        });
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
    Logger.log(response.getMessage());
    return response;
  }

  async verification(token: string) {
    const response = new OkResponse<User>();
    try {
      const result = await this.usersService.verification(token);
      if (result === true) {
        response.setResponse({
          data: { isActive: result },
          statusCode: 200,
          message: 'your account has been activated successfully',
        });
      } else {
        throw new NotFoundException(`invalid token`);
      }
    } catch (error) {
      throw error;
    }
    return response;
  }

  async passwordReset(user: User) {
    const response = new OkResponse<User>();
    try {
      await this.usersService.passwordReset(user);
      response.setResponse({
        data: {},
        message: 'password changed with succesful',
        statusCode: 200,
      });
    } catch (error) {
      if (error instanceof DataErrorException) {
        throw new ConflictException(error.toString());
      } else if (error instanceof DatabaseErrorException) {
        throw new InternalServerErrorException(error.toString());
      }
    }
    return response;
  }

  async passwordResetRequest(user: User) {
    const response = new OkResponse<AccessToken>();
    let userData: User;
    let payload = {};
    let passwordResetTemplate: VerificationTemplate = {};
    try {
      userData = await this.usersService.findOneByEmail(user);
    } catch (error) {
      Logger.error(error);
    }
    payload = {
      email: userData.email,
      username: userData.username,
      sub: userData.id,
      name: `${userData.name} ${userData.lastname}`,
      profileImage: userData.profileImage,
    };
    response.setResponse({
      data: { accessToken: this.jwtService.sign(payload) },
      message: 'password reset request generated successfully',
      statusCode: 200,
    });
    passwordResetTemplate = {
      activationURL:
        environment.apiUrl +
        '/auth/token-verification?token=' +
        response.getData().accessToken,
      completeName: userData.name + ' ' + userData.lastname,
    };

    await this.mailerService.sendMail({
      to: userData.email,
      from: emailConstants.from,
      subject: 'Registro exitoso',
      template: 'password-reset',
      context: passwordResetTemplate,
    });
    return response;
  }
  async tokenVerification(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      throw error;
    }
  }
}
