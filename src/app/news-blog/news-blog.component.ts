import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsBlogService } from '../services/news-blog.service';
import { News } from '../interfaces/news';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-blog',
  templateUrl: './news-blog.component.html',
  styleUrls: ['./news-blog.component.scss']
})
export class NewsBlogComponent implements OnInit, OnDestroy {
  language: string;
  languageSubscription: Subscription;

  news: News[];
  pages: number[];
  currentPage: number;

  constructor(private newsBlogService: NewsBlogService, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
    this.languageSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
      this.getNews(this.currentPage);
    });

    this.news = [];
    this.pages = [1];
    this.currentPage = 1;

    this.getTotalPages();
    this.getNews(this.currentPage);
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  getNews(page: number): void {
    this.currentPage = page;
    this.newsBlogService.get(page).then((news: News[]) => {
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
