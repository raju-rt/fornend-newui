import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceClassificationComponent } from './service-classification.component';

describe('ServiceClassificationComponent', () => {
  let component: ServiceClassificationComponent;
  let fixture: ComponentFixture<ServiceClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
