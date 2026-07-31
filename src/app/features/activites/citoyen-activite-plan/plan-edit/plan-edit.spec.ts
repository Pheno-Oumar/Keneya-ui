import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEditComponent } from './plan-edit';

describe('PlanEdit', () => {
  let component: PlanEditComponent;
  let fixture: ComponentFixture<PlanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

