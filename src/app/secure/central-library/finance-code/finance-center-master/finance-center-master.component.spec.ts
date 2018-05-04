import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCenterMasterComponent } from './finance-center-master.component';

describe('FinanceCenterMasterComponent', () => {
  let component: FinanceCenterMasterComponent;
  let fixture: ComponentFixture<FinanceCenterMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceCenterMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceCenterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
