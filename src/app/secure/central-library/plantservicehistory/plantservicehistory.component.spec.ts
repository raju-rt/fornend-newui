import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantservicehistoryComponent } from './plantservicehistory.component';

describe('PlantservicehistoryComponent', () => {
  let component: PlantservicehistoryComponent;
  let fixture: ComponentFixture<PlantservicehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantservicehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantservicehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
