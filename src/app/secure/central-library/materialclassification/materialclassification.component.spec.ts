import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialclassificationComponent } from './materialclassification.component';

describe('MaterialclassificationComponent', () => {
  let component: MaterialclassificationComponent;
  let fixture: ComponentFixture<MaterialclassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialclassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialclassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
