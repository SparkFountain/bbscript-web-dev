import { Component, OnInit } from '@angular/core';
import { Feature } from '../interfaces/feature';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  features: Array<Feature[]>;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.features = [
      [
        {
          icon: 'gamepad',
          title: this.translateService.instant('FEATURES.1.TITLE'),
          message: this.translateService.instant('FEATURES.1.MESSAGE')
        },
        {
          icon: 'cubes',
          title: this.translateService.instant('FEATURES.2.TITLE'),
          message: this.translateService.instant('FEATURES.2.MESSAGE')
        },
        {
          icon: 'cubes',
          title: this.translateService.instant('FEATURES.2.TITLE'),
          message: this.translateService.instant('FEATURES.2.MESSAGE')
        }
      ],
      [
        {
          icon: 'cubes',
          title: this.translateService.instant('FEATURES.2.TITLE'),
          message: this.translateService.instant('FEATURES.2.MESSAGE')
        },
        {
          icon: 'cubes',
          title: this.translateService.instant('FEATURES.2.TITLE'),
          message: this.translateService.instant('FEATURES.2.MESSAGE')
        },
        {
          icon: 'cubes',
          title: this.translateService.instant('FEATURES.2.TITLE'),
          message: this.translateService.instant('FEATURES.2.MESSAGE')
        }
      ]
    ];
  }
}
