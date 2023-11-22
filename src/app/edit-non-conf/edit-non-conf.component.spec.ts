import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNonConfComponent } from './edit-non-conf.component';

describe('EditNonConfComponent', () => {
  let component: EditNonConfComponent;
  let fixture: ComponentFixture<EditNonConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNonConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNonConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
