import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.scss']
})
export class GamingComponent implements OnInit {
  public code: string[];

  constructor() { }

  ngOnInit() {
    this.code = ['Color 255, 128, 15', 'Rect 20, 35, 100, 75'];
  }

}
