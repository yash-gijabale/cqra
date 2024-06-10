import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRedGreenCardComponent } from './create-red-green-card.component';

describe('CreateRedGreenCardComponent', () => {
  let component: CreateRedGreenCardComponent;
  let fixture: ComponentFixture<CreateRedGreenCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRedGreenCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRedGreenCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
