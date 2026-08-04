import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteDetailDialog } from './activite-detail-dialog';

describe('ActiviteDetailDialog', () => {
  let component: ActiviteDetailDialog;
  let fixture: ComponentFixture<ActiviteDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiviteDetailDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiviteDetailDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
