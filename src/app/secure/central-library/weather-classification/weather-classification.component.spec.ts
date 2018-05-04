import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherClassificationComponent } from './weather-classification.component';

describe('WeatherClassificationComponent', () => {
  let component: WeatherClassificationComponent;
  let fixture: ComponentFixture<WeatherClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
