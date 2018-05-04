import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCountryProvisionsComponent } from './tax-country-provisions.component';

describe('TaxCountryProvisionsComponent', () => {
  let component: TaxCountryProvisionsComponent;
  let fixture: ComponentFixture<TaxCountryProvisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxCountryProvisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCountryProvisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
