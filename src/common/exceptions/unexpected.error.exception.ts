import { ErrorException } from "./error.exception";

export class UnexpectedErrorException extends ErrorException {
  error?: string;
  message?: string;
  statusCode: number;

  constructor(message = 'unexpected error has ocurred') {
    super(message);
    this.message = message;
    this.error = 'unexpected error has ocurred';
    this.statusCode = 500;
  }


}
