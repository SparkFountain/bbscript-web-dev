export interface ApiResponse {
  status: string;
  data?: any;
  message?: string;
  code?: number;
}

export const STATUS_SUCCESS = 'success';
export const STATUS_FAIL = 'fail';
export const STATUS_ERROR = 'error';
