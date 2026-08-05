import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailDialog } from './agent-detail-dialog';

describe('AgentDetailDialog', () => {
  let component: AgentDetailDialog;
  let fixture: ComponentFixture<AgentDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDetailDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AgentDetailDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
