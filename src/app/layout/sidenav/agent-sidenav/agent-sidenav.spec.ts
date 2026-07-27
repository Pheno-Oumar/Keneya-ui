import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSidenav } from './agent-sidenav';

describe('AdminSidenav', () => {
  let component: AgentSidenav;
  let fixture: ComponentFixture<AgentSidenav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentSidenav],
    }).compileComponents();

    fixture = TestBed.createComponent(AgentSidenav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
