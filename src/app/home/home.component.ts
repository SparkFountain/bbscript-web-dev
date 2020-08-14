import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public reasonIcons = ['thumbs-up', 'code', 'rocket', 'bolt', 'code-fork', 'trophy'];

  constructor() {}

  ngOnInit(): void {}
}
