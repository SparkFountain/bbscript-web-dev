import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NavigationElement } from './types/navigation-element';
import { NavigationMenu } from './classes/navigation-menu';
import { NavigationLink } from './classes/navigation-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public navigationElements: {
    left: NavigationMenu[];
    right: NavigationMenu[];
  };

  public mobileMenu: {
    open: boolean;
    closing: boolean;
    // context: MobileMenuContext
  };
  // public MobileMenuContext: any = MobileMenuContext;
  public Language = Language;

  constructor(public translate: TranslateService, public router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    this.translate.addLangs(['en', 'de']);

    // initialize navigation
    this.navigationElements = {
      left: [
        new NavigationMenu('fa-home', 'HOME', [
          'OVERVIEW',
          'NEWS_BLOG',
          'FEATURES',
          'COMPARISON',
        ]),
        new NavigationMenu('fa-dashboard', 'LETS_CODE', [
          'EMPTY_PROJECT',
          'TEMPLATES',
        ]),
        new NavigationMenu('fa-cubes', 'PROJECTS', [
          'DEMOS',
          'MY_PROJECTS',
          'COMMUNITY',
        ]),
        new NavigationMenu('fa-graduation-cap', 'TUTORIALS', [
          'BASICS',
          'GRAPHICS',
          'IO',
          'SOUND',
          'GUI',
          'PARTICLES',
          '3D',
        ]),
        new NavigationMenu('fa-book', 'DOCUMENTATION', [
          'KEYWORDS',
          'COMMANDS',
          'CONSTANTS_AND_SCANCODES',
          'DIFFERENCES_TO_BLITZ_BASIC',
          'MIGRATION_GUIDE',
        ]),
      ],
      right: [],
    };

    // TODO: refactor -> initialize old mobile menu
    this.mobileMenu = {
      open: false,
      closing: false,
      // context: MobileMenuContext.DEFAULT
    };
  }

  isNavLink(
    navigationElement: NavigationElement
  ): navigationElement is NavigationLink {
    return (navigationElement as NavigationLink).path !== undefined;
  }

  isNavMenu(
    navigationElement: NavigationElement
  ): navigationElement is NavigationMenu {
    return (navigationElement as NavigationMenu).submenus !== undefined;
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  toggleMobileMenu() {
    if (this.mobileMenu.open) {
      this.mobileMenu.closing = true;
      of(null)
        .pipe(delay(500))
        .subscribe(() => {
          this.mobileMenu.open = false;
          this.mobileMenu.closing = false;
          // this.mobileMenu.context = MobileMenuContext.DEFAULT;
        });
    } else {
      this.mobileMenu.open = true;
    }
  }
}

export const Language = {
  GERMAN: 'de',
  ENGLISH: 'en',
};
