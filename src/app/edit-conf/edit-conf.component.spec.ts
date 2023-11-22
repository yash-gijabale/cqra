import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfComponent } from './edit-conf.component';

describe('EditConfComponent', () => {
  let component: EditConfComponent;
  let fixture: ComponentFixture<EditConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
