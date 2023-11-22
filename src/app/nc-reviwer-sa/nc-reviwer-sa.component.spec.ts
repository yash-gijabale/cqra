import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcReviwerSaComponent } from './nc-reviwer-sa.component';

describe('NcReviwerSaComponent', () => {
  let component: NcReviwerSaComponent;
  let fixture: ComponentFixture<NcReviwerSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcReviwerSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcReviwerSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
