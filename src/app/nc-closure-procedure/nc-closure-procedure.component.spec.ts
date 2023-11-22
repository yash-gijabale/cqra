import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcClosureProcedureComponent } from './nc-closure-procedure.component';

describe('NcClosureProcedureComponent', () => {
  let component: NcClosureProcedureComponent;
  let fixture: ComponentFixture<NcClosureProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcClosureProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcClosureProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
