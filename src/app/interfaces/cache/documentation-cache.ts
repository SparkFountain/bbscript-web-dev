import { ApiResponse } from '../api-response';

export interface DocCache {
  route: string;
  params: object;
  data: ApiResponse<any>;
}
