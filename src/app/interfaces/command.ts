import { LanguageCategory } from './language-category';

export interface Command {
  id: number;
  name: string;
  deprecated?: boolean;
  category: LanguageCategory;
  subCategory: LanguageCategory;
}
