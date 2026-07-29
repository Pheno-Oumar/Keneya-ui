import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseilFormDialog } from './conseil-form-dialog';

describe('ConseilFormDialog', () => {
  let component: ConseilFormDialog;
  let fixture: ComponentFixture<ConseilFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConseilFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConseilFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

