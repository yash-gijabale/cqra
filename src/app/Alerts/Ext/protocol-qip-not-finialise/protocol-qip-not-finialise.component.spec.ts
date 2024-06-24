import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolQipNotFinialiseComponent } from './protocol-qip-not-finialise.component';

describe('ProtocolQipNotFinialiseComponent', () => {
  let component: ProtocolQipNotFinialiseComponent;
  let fixture: ComponentFixture<ProtocolQipNotFinialiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolQipNotFinialiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolQipNotFinialiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
