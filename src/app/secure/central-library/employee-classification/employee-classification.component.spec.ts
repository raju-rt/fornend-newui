import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClassificationComponent } from './employee-classification.component';

describe('EmployeeClassificationComponent', () => {
  let component: EmployeeClassificationComponent;
  let fixture: ComponentFixture<EmployeeClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
