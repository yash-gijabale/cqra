import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NCClosureSAComponent } from './ncclosure-sa.component';

describe('NCClosureSAComponent', () => {
  let component: NCClosureSAComponent;
  let fixture: ComponentFixture<NCClosureSAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NCClosureSAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NCClosureSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
