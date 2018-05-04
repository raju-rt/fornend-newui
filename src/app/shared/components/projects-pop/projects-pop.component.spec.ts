import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPopComponent } from './projects-pop.component';

describe('ProjectsPopComponent', () => {
  let component: ProjectsPopComponent;
  let fixture: ComponentFixture<ProjectsPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
