import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcRedAlertComponent } from './nc-red-alert.component';

describe('NcRedAlertComponent', () => {
  let component: NcRedAlertComponent;
  let fixture: ComponentFixture<NcRedAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcRedAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcRedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
