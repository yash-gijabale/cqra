import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRemarkComponent } from './create-remark.component';

describe('CreateRemarkComponent', () => {
  let component: CreateRemarkComponent;
  let fixture: ComponentFixture<CreateRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
