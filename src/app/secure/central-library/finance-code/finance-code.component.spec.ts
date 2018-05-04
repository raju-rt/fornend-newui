import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCodeComponent } from './finance-code.component';

describe('FinanceCodeComponent', () => {
  let component: FinanceCodeComponent;
  let fixture: ComponentFixture<FinanceCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
