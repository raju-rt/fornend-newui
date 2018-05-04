import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCreateComponent } from './weather-create.component';

describe('WeatherCreateComponent', () => {
  let component: WeatherCreateComponent;
  let fixture: ComponentFixture<WeatherCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
