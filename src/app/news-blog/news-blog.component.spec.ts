import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBlogComponent } from './news-blog.component';

describe('NewsBlogComponent', () => {
  let component: NewsBlogComponent;
  let fixture: ComponentFixture<NewsBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
