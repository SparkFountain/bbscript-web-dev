import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LexerComponent } from './lexer.component';

describe('LexerComponent', () => {
  let component: LexerComponent;
  let fixture: ComponentFixture<LexerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LexerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LexerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
