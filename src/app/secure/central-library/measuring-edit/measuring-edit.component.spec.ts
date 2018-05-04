import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringEditComponent } from './measuring-edit.component';

describe('MeasuringEditComponent', () => {
  let component: MeasuringEditComponent;
  let fixture: ComponentFixture<MeasuringEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuringEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
