import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() id?: number;
  @Input() title: string;
  @Input() message: string;
  @Input() author?: string;
  @Input() createdAt?: Date;
  @Input() lastModifiedAt?: Date;
  @Input() image?: string;

  public dateFormat: string;

  constructor(private translateService: TranslateService) {
    this.dateFormat = this.translateService.instant('DATE_FORMAT');
  }

  ngOnInit() {
  }

}
