import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedNcReportComponent } from './deleted-nc-report.component';

describe('DeletedNcReportComponent', () => {
  let component: DeletedNcReportComponent;
  let fixture: ComponentFixture<DeletedNcReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedNcReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedNcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
