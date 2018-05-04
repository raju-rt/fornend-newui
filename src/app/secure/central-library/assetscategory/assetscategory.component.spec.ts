import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetscategoryComponent } from './assetscategory.component';

describe('AssetscategoryComponent', () => {
  let component: AssetscategoryComponent;
  let fixture: ComponentFixture<AssetscategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetscategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetscategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
