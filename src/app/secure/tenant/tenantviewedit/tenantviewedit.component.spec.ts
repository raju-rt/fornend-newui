import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantvieweditComponent } from './tenantviewedit.component';

describe('TenantvieweditComponent', () => {
  let component: TenantvieweditComponent;
  let fixture: ComponentFixture<TenantvieweditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantvieweditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantvieweditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
