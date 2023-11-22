import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcApproverSaComponent } from './nc-approver-sa.component';

describe('NcApproverSaComponent', () => {
  let component: NcApproverSaComponent;
  let fixture: ComponentFixture<NcApproverSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcApproverSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcApproverSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
