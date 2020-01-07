import { LanguageCategory } from './language-category.interface';

export interface Command {
  id: number;
  name: string;
  deprecated?: boolean;
  category: LanguageCategory;
  subCategory: LanguageCategory;
}
