import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase5Component } from './phase5.component';

describe('Phase5Component', () => {
  let component: Phase5Component;
  let fixture: ComponentFixture<Phase5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phase5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
