import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRedGreenCardTokenSummaryComponent } from './create-red-green-card-token-summary.component';

describe('CreateRedGreenCardTokenSummaryComponent', () => {
  let component: CreateRedGreenCardTokenSummaryComponent;
  let fixture: ComponentFixture<CreateRedGreenCardTokenSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRedGreenCardTokenSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRedGreenCardTokenSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
