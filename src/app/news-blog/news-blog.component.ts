import { Component, OnInit } from '@angular/core';
import { NewsBlogService } from '../services/news-blog.service';
import { News } from '../interfaces/news';

@Component({
  selector: 'app-news-blog',
  templateUrl: './news-blog.component.html',
  styleUrls: ['./news-blog.component.scss']
})
export class NewsBlogComponent implements OnInit {
  news: News[];
  pages: number[];
  currentPage: number;

  constructor(private newsBlogService: NewsBlogService) {}

  ngOnInit(): void {
    this.news = [];
    this.pages = [1];
    this.currentPage = 1;

    this.getTotalPages();
    this.getNews();
  }

  getNews(): void {
    this.newsBlogService.get(this.currentPage).then((news: News[]) => {
      this.news = news;
      console.info('[NEWS]', this.news);
    });
  }

  getTotalPages(): void {
    this.newsBlogService.getTotalPages().then((totalPages: number) => {
      this.pages = Array(totalPages)
        .fill(1)
        .map((x, i) => i + 1);
    });
  }
}
