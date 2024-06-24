import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodworkPracticesComponent } from './edit-goodwork-practices.component';

describe('EditGoodworkPracticesComponent', () => {
  let component: EditGoodworkPracticesComponent;
  let fixture: ComponentFixture<EditGoodworkPracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGoodworkPracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGoodworkPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
