import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNCClosureHistoryComponent } from './create-ncclosure-history.component';

describe('CreateNCClosureHistoryComponent', () => {
  let component: CreateNCClosureHistoryComponent;
  let fixture: ComponentFixture<CreateNCClosureHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNCClosureHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNCClosureHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
