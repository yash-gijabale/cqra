import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRfiComponent } from './create-rfi.component';

describe('CreateRfiComponent', () => {
  let component: CreateRfiComponent;
  let fixture: ComponentFixture<CreateRfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
