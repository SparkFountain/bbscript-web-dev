import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public features: Feature[];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    const images: string[] = [
      'laptop.jpeg',
      'palm-trees.jpeg',
      'devices.jpg',
      'keyboard.jpeg',
      'super-mario.jpeg',
      'gamble.jpeg',
      'shadow.jpg',
      'community.jpg',
      'dart.jpeg'
    ];

    this.features = [];
    for (let i = 0; i <= 8; i++) {
      this.features.push({
        title: this.translate.instant(`FEATURES.${i + 1}.TITLE`),
        message: this.translate.instant(`FEATURES.${i + 1}.MESSAGE`),
        image: `/assets/gfx/${images[i]}`
      });
    }
  }

}

export interface Feature {
  title: string;
  message: string;
  image: string;
}
