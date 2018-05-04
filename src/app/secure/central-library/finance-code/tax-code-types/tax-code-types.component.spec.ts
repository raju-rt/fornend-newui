import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCodeTypesComponent } from './tax-code-types.component';

describe('TaxCodeTypesComponent', () => {
  let component: TaxCodeTypesComponent;
  let fixture: ComponentFixture<TaxCodeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxCodeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCodeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
