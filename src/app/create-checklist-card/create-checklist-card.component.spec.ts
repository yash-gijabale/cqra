import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChecklistCardComponent } from './create-checklist-card.component';

describe('CreateChecklistCardComponent', () => {
  let component: CreateChecklistCardComponent;
  let fixture: ComponentFixture<CreateChecklistCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChecklistCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChecklistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
