import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisBelowPersonComponent } from './mis-below-person.component';

describe('MisBelowPersonComponent', () => {
  let component: MisBelowPersonComponent;
  let fixture: ComponentFixture<MisBelowPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisBelowPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisBelowPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
