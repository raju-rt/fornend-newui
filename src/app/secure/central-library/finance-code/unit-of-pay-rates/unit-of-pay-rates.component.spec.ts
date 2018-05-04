import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfPayRatesComponent } from './unit-of-pay-rates.component';

describe('UnitOfPayRatesComponent', () => {
  let component: UnitOfPayRatesComponent;
  let fixture: ComponentFixture<UnitOfPayRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOfPayRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfPayRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
