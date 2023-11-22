import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnaggingDocumentComponent } from './create-snagging-document.component';

describe('CreateSnaggingDocumentComponent', () => {
  let component: CreateSnaggingDocumentComponent;
  let fixture: ComponentFixture<CreateSnaggingDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSnaggingDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSnaggingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
