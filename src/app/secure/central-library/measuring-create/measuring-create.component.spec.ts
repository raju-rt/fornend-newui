import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringCreateComponent } from './measuring-create.component';

describe('MeasuringCreateComponent', () => {
  let component: MeasuringCreateComponent;
  let fixture: ComponentFixture<MeasuringCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuringCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
