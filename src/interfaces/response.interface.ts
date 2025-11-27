export type ResponseMessage = string
export enum ResponseStatus {
  Error = 'error',
  Success = 'success'
}

export interface PaginationPayload<T> {
  data: T
  pagination: {
    total: number
    currentPage: number
    totalPage: number
    perPage: number
  }
}

export interface HttpErrorResponse {
  status: ResponseStatus.Error
  message: ResponseMessage
  error: string
  timestamp: string
}

export interface HttpSuccessResponse<T> {
  status: ResponseStatus.Success
  message: ResponseMessage
  result: T | PaginationPayload<T>
}
