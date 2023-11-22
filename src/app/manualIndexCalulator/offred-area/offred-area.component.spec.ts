import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffredAreaComponent } from './offred-area.component';

describe('OffredAreaComponent', () => {
  let component: OffredAreaComponent;
  let fixture: ComponentFixture<OffredAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffredAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffredAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
