import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeMomReportsComponent } from './scheme-mom-reports.component';

describe('SchemeMomReportsComponent', () => {
  let component: SchemeMomReportsComponent;
  let fixture: ComponentFixture<SchemeMomReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeMomReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeMomReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
