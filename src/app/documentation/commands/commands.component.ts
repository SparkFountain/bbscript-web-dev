import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/interfaces/api-response';

export interface CommandCategoryDoc {
  headline: string;
  description: string;
}

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {
  @Input() category: string;
  @Input() subCategory: string;
  @Input() command: string;

  headline: string;
  description: string;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    if (!this.category) {
      this.headline = this.translate.instant('DOC.COMMANDS.HEADLINE');
      this.description = this.translate.instant('DOC.COMMANDS.SUBTITLE');
    } else if (this.category && !this.subCategory) {
      this.http
        .get(`${environment.apiServer}/docs/commands`, {
          params: {
            category: this.category,
            language: this.translate.currentLang
          }
        })
        .toPromise()
        .then((response: ApiResponse<CommandCategoryDoc>) => {
          this.headline = response.data.headline;
          this.description = response.data.description;
        });
    } else if (this.category && this.subCategory && !this.command) {
      this.http
        .get(`${environment.apiServer}/docs/commands`, {
          params: {
            category: this.category,
            subCategory: this.subCategory,
            language: this.translate.currentLang
          }
        })
        .toPromise()
        .then((response: ApiResponse<CommandCategoryDoc>) => {
          this.headline = response.data.headline;
          this.description = response.data.description;
        });
    }
  }
}
