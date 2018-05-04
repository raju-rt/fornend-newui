import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpWageComponent } from './emp-wage.component';

describe('EmpWageComponent', () => {
  let component: EmpWageComponent;
  let fixture: ComponentFixture<EmpWageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpWageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpWageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
