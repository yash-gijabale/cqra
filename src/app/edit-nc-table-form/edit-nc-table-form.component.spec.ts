import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNcTableFormComponent } from './edit-nc-table-form.component';

describe('EditNcTableFormComponent', () => {
  let component: EditNcTableFormComponent;
  let fixture: ComponentFixture<EditNcTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNcTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNcTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
