import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsListComponent } from './agents-list';

describe('AgentsList', () => {
  let component: AgentsListComponent;
  let fixture: ComponentFixture<AgentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgentsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
