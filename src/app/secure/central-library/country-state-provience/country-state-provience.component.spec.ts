import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStateProvienceComponent } from './country-state-provience.component';

describe('CountryStateProvienceComponent', () => {
  let component: CountryStateProvienceComponent;
  let fixture: ComponentFixture<CountryStateProvienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryStateProvienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStateProvienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
