import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseilDetailDialog } from './conseil-detail-dialog';

describe('ConseilDetailDialog', () => {
  let component: ConseilDetailDialog;
  let fixture: ComponentFixture<ConseilDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConseilDetailDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConseilDetailDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

