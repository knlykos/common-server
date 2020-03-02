export interface ResponseInterface<T> {
  data: T;
  statusCode?: number;
  message?: string;
  error?: string;
}

export class ResponseApi<T> {
  private data: T;
  private statusCode?: number;
  private message?: string;
  private error?: string;

  constructor(message: string) {
    this.message = message;
    this.statusCode = 200;
  }
  getResponse() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }

  setMessage(message: string) {
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode;
  }

  getStatusCode() {
    return this.statusCode;
  }

  setData(data: T) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setResponse(response: ResponseInterface<T>) {
    this.data = response.data;
    this.statusCode = response.statusCode;
    this.message = response.message;
  }
}
