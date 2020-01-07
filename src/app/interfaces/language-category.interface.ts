export interface LanguageCategory {
  id: number;
  name: string;
  parent: LanguageCategory | null;
}
