import { ErrorException } from './error.exception';

export class DataErrorException extends ErrorException {
  error?: string;
  message?: string;
  statusCode: number;

  constructor(message = 'correct your data and try again') {
    super(message);
    this.message = message;
    this.error = 'verify your data and try again';
    this.statusCode = 403;
  }

}
