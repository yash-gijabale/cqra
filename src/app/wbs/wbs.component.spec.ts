import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WbsComponent } from './wbs.component';

describe('WbsComponent', () => {
  let component: WbsComponent;
  let fixture: ComponentFixture<WbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
