import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOffredAreaComponent } from './create-offred-area.component';

describe('CreateOffredAreaComponent', () => {
  let component: CreateOffredAreaComponent;
  let fixture: ComponentFixture<CreateOffredAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOffredAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOffredAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
