import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcListComponent } from './pmc-list.component';

describe('PmcListComponent', () => {
  let component: PmcListComponent;
  let fixture: ComponentFixture<PmcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
