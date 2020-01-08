import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  public mobileMenu: {
    open: boolean;
    closing: boolean;
    // context: MobileMenuContext
  };
  // public MobileMenuContext: any = MobileMenuContext;
  public Language = Language;

  constructor(public translate: TranslateService, public router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang("en");

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|de/) ? browserLang : "en");
    this.translate.addLangs(["en", "de"]);

    this.mobileMenu = {
      open: false,
      closing: false
      // context: MobileMenuContext.DEFAULT
    };
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
  GERMAN: "de",
  ENGLISH: "en"
};
