import { License } from '../types/license';

export interface Project {
  title: string;
  description: string;
  license: License;
  imageUrl: string;
}
