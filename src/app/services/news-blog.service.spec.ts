import { TestBed } from '@angular/core/testing';

import { NewsBlogService } from './news-blog.service';

describe('NewsBlogService', () => {
  let service: NewsBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
