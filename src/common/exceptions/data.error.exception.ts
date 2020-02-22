export class DataErrorException {
  error?: string;
  message?: string;
  statusCode: number;

  constructor(message = 'correct your data and try again') {
    this.message = message;
    this.error = 'verify your data and try again';
    this.statusCode = 403;
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
