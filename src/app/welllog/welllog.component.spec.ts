import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelllogComponent } from './welllog.component';

describe('WelllogComponent', () => {
  let component: WelllogComponent;
  let fixture: ComponentFixture<WelllogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelllogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelllogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
