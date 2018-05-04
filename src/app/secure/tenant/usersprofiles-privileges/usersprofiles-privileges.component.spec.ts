import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersprofilesPrivilegesComponent } from './usersprofiles-privileges.component';

describe('UsersprofilesPrivilegesComponent', () => {
  let component: UsersprofilesPrivilegesComponent;
  let fixture: ComponentFixture<UsersprofilesPrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersprofilesPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersprofilesPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
