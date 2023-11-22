import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSignoffDocumentComponent } from './create-signoff-document.component';

describe('CreateSignoffDocumentComponent', () => {
  let component: CreateSignoffDocumentComponent;
  let fixture: ComponentFixture<CreateSignoffDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSignoffDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSignoffDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
