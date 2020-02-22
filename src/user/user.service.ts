import {
  Injectable,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { UnexpectedErrorException } from 'src/common/exceptions/unexpected.error.exception';
import { DataErrorException } from 'src/common/exceptions/data.error.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async passwordMatch(
    user: User,
  ): Promise<{ passwordMatch?: boolean; userData: User }> {
    let userResultSet: User;
    let passwordMatch = false;
    try {
      userResultSet = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (userResultSet === undefined || userResultSet === null) {
        throw new DataErrorException('the email account not exist');
      } else {
        if (userResultSet.isActive === false) {
          throw new DataErrorException(`the account it's inactive`);
        } else {
          passwordMatch = await compare(user.password, userResultSet.password);
          if (passwordMatch) {
            return { passwordMatch: passwordMatch, userData: userResultSet };
          } else {
            throw new DataErrorException(`the password it's incorrect`);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async create(user: User): Promise<User> {
    let userResultSet: User;
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
    try {
      this.userRepository.create(user);
      this.userRepository.hasId;
      // eslint-disable-next-line prefer-const
      userResultSet = await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail.split(/\((.*?)\)/);
        if (detail[1] === 'username') {
          throw new ConflictException('The username already exist');
        }
        if (detail[1] === 'email') {
          throw new ConflictException('The email already exist');
        }
        // const error = new Error('')
      }
      if (error.code === '22001') {
        throw new ConflictException('Value too long');
      } else {
        throw error.message;
      }
      Logger.log('eroor', error);
    }
    // \((.*?)\)
    return userResultSet;
  }

  async verification(activationToken: string) {
    let user: User;
    try {
      user = await this.userRepository.findOne({
        where: { activationToken: activationToken },
      });
      if (user === undefined) {
        return false;
      }
    } catch (error) {
      throw new InternalServerErrorException('unexpected error has ocurred');
    }
    if (user.isActive === true) {
      throw new ConflictException('the token already was used previously');
    } else {
      try {
        user.isActive = true;
        await this.userRepository.save(user);
      } catch (error) {
        throw new InternalServerErrorException('please, try again');
      }
    }
    return true;
  }
}
