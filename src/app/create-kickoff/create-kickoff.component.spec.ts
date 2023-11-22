import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKickoffComponent } from './create-kickoff.component';

describe('CreateKickoffComponent', () => {
  let component: CreateKickoffComponent;
  let fixture: ComponentFixture<CreateKickoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKickoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKickoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
