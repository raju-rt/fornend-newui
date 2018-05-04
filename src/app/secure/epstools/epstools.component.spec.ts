import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpstoolsComponent } from './epstools.component';

describe('EpstoolsComponent', () => {
  let component: EpstoolsComponent;
  let fixture: ComponentFixture<EpstoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpstoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpstoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
