import { ErrorException } from './error.exception';

export class DatabaseErrorException extends ErrorException {
  constructor(message = 'unexpected error has ocurred') {
    super(message);
    this.error = 'unexpected error has ocurred';
    this.statusCode = 500;
  }
}
