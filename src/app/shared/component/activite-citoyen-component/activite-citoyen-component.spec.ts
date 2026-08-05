import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteCitoyenComponent } from './activite-citoyen-component';

describe('ActiviteCitoyenComponent', () => {
  let component: ActiviteCitoyenComponent;
  let fixture: ComponentFixture<ActiviteCitoyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiviteCitoyenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiviteCitoyenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
