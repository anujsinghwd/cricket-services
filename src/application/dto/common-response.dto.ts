// src/application/dto/common-response.dto.ts
export class CommonResponse<T> {
  constructor(
    public readonly status: boolean,
    public readonly message: string,
    public readonly data?: T, // Optional payload of generic type T
    public readonly error?: any, // Optional error object
  ) {}

  static success<T>(data: T, message: string = 'Success'): CommonResponse<T> {
    return new CommonResponse<T>(true, message, data);
  }

  static failure<T>(message: string, error?: any): CommonResponse<T> {
    return new CommonResponse<T>(false, message, undefined, error);
  }
}
