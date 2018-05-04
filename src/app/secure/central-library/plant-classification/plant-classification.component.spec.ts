import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantClassificationComponent } from './plant-classification.component';

describe('PlantClassificationComponent', () => {
  let component: PlantClassificationComponent;
  let fixture: ComponentFixture<PlantClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
