import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringUnitsComponent } from './measuring-units.component';

describe('MeasuringUnitsComponent', () => {
  let component: MeasuringUnitsComponent;
  let fixture: ComponentFixture<MeasuringUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuringUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
