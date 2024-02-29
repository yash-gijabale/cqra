import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorDeclarationViewComponent } from './inspector-declaration-view.component';

describe('InspectorDeclarationViewComponent', () => {
  let component: InspectorDeclarationViewComponent;
  let fixture: ComponentFixture<InspectorDeclarationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorDeclarationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorDeclarationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
