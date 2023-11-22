import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStageOfWorkComponent } from './create-stage-of-work.component';

describe('CreateStageOfWorkComponent', () => {
  let component: CreateStageOfWorkComponent;
  let fixture: ComponentFixture<CreateStageOfWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStageOfWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStageOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
