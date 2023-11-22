import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnaggingDocumentComponent } from './snagging-document.component';

describe('SnaggingDocumentComponent', () => {
  let component: SnaggingDocumentComponent;
  let fixture: ComponentFixture<SnaggingDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnaggingDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnaggingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
