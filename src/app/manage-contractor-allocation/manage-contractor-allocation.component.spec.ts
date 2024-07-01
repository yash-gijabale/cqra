import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContractorAllocationComponent } from './manage-contractor-allocation.component';

describe('ManageContractorAllocationComponent', () => {
  let component: ManageContractorAllocationComponent;
  let fixture: ComponentFixture<ManageContractorAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContractorAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContractorAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
