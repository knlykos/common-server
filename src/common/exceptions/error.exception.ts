export class ErrorException {
  error?: string;
  message?: string;
  statusCode: number;

  constructor(message = 'unexpected error has ocurred') {
    this.message = message;
    this.error = 'unexpected error has ocurred';
    this.statusCode = 500;
  }

  toString(): string {
    return this.message;
  }
  getError(): string {
    return this.error;
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}
