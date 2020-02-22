import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as cryptoRandomString from 'crypto-random-string';
import { User } from 'src/entities/user.entity';
import { ResponseApi } from 'src/common/objects/response.api';
import { MailerService } from '@nest-modules/mailer';
import { SignUpTemplate } from 'src/models/signup.template.model';
import { environment } from './../enviroments/environment';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(user: User): Promise<ResponseApi<User>> {
    let signUpTemplate: SignUpTemplate;
    let response: ResponseApi<User> = {
      data: { activationToken: '' },
      statusCode: 0,
      message: 'OK',
    };
    const randomString = cryptoRandomString({ length: 30 });
    user.activationToken = randomString;
    try {
      const userResultSet = await this.usersService.create(user);
      response.data.activationToken = userResultSet.activationToken;
      response.data.id = userResultSet.id;
      response.data.email = userResultSet.email;
      response.data.name = userResultSet.name;
      response.data.lastname = userResultSet.lastname;
      try {
        signUpTemplate = {
          activationURL:
            environment.apiUrl +
            '/auth/verification?token=' +
            response.data.activationToken,
          completeName: response.data.name + ' ' + response.data.lastname,
        };

        await this.mailerService.sendMail({
          to: response.data.email,
          from: 'noreply@nkodex.dev',
          subject: 'Registro exitoso',
          template: 'signin',
          context: signUpTemplate,
        });
      } catch (error) {
        console.log(error);
        response = {
          data: {},
          error: 'Sucedio un error inesperado al enviar un email',
          statusCode: 504,
        };
      }
    } catch (error) {
      response = {
        data: {},
        error: error,
        statusCode: 504,
      };
      console.log(response);
    }

    return response;
  }

  async verification(token: string) {
    let response: ResponseApi<User>;
    try {
      const result = await this.usersService.verification(token);
      if (result === true) {
        response = {
          data: { isActive: result },
          statusCode: 200,
          message: 'your account has been activated successfully',
        };
      } else {
        response = {
          data: {},
          statusCode: 403,
          message: `the token it's incorrect`,
        };
      }
    } catch (error) {
      console.log(typeof error);
      return error.response;
    }
    return response;
  }
}
