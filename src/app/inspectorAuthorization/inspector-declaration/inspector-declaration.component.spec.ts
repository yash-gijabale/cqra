import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorDeclarationComponent } from './inspector-declaration.component';

describe('InspectorDeclarationComponent', () => {
  let component: InspectorDeclarationComponent;
  let fixture: ComponentFixture<InspectorDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
