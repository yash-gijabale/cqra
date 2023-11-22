import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractorSupervisorComponent } from './create-contractor-supervisor.component';

describe('CreateContractorSupervisorComponent', () => {
  let component: CreateContractorSupervisorComponent;
  let fixture: ComponentFixture<CreateContractorSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractorSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractorSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
