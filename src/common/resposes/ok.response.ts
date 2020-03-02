import { ResponseApi } from '../objects/response.api';

export class OkResponse<T> extends ResponseApi<T> {
  constructor(message = 'Ok') {
    super(message);
    this.setMessage(message);
    this.setStatusCode(200);
  }
}
