import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseStockyardlistComponent } from './warehouse-stockyardlist.component';

describe('WarehouseStockyardlistComponent', () => {
  let component: WarehouseStockyardlistComponent;
  let fixture: ComponentFixture<WarehouseStockyardlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseStockyardlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseStockyardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
