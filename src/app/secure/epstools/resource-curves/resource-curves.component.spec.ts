import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCurvesComponent } from './resource-curves.component';

describe('ResourceCurvesComponent', () => {
  let component: ResourceCurvesComponent;
  let fixture: ComponentFixture<ResourceCurvesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCurvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCurvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
