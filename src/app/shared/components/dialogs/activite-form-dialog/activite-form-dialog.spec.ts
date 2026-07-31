import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitetFormDialog } from './activite-form-dialog';

describe('AgentFormDialog', () => {
  let component: ActivitetFormDialog;
  let fixture: ComponentFixture<ActivitetFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitetFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivitetFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

