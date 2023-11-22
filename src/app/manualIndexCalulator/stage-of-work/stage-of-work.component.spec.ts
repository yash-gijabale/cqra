import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageOfWorkComponent } from './stage-of-work.component';

describe('StageOfWorkComponent', () => {
  let component: StageOfWorkComponent;
  let fixture: ComponentFixture<StageOfWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageOfWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
