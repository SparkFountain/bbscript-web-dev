import { License } from '../types/license';

export interface Project {
  title: string;
  author: string;
  description: string;
  license: License;
  imageUrl: string;
}
