import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubgroupComponent } from './create-subgroup.component';

describe('CreateSubgroupComponent', () => {
  let component: CreateSubgroupComponent;
  let fixture: ComponentFixture<CreateSubgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
