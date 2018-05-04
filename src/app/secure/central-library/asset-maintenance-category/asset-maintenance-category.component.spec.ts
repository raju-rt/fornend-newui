import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMaintenanceCategoryComponent } from './asset-maintenance-category.component';

describe('AssetMaintenanceCategoryComponent', () => {
  let component: AssetMaintenanceCategoryComponent;
  let fixture: ComponentFixture<AssetMaintenanceCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMaintenanceCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMaintenanceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
