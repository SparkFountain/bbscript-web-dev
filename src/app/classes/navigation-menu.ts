export class NavigationMenu {
  public icon: string;
  public text: string;
  public submenus: string[];

  constructor(icon: string, text: string, submenus: string[]) {
    this.icon = icon;
    this.text = text;
    this.submenus = submenus;
  }
}
