import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSnapauditFromsComponent } from './pre-snapaudit-froms.component';

describe('PreSnapauditFromsComponent', () => {
  let component: PreSnapauditFromsComponent;
  let fixture: ComponentFixture<PreSnapauditFromsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreSnapauditFromsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSnapauditFromsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
