import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZybooksComponent } from './zybooks.component';

describe('ZybooksComponent', () => {
  let component: ZybooksComponent;
  let fixture: ComponentFixture<ZybooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZybooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZybooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
