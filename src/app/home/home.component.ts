import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public reasonImages = [
    'super-mario.jpeg',
    'laptop.jpeg',
    'lexer.jpg',
    'dont-get-angry.jpeg',
    'community.jpg',
  ];

  constructor() {}

  ngOnInit(): void {}
}
