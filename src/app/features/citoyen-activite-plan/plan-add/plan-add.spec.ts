import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAddComponent } from './plan-add';

describe('PlanAdd', () => {
  let component: PlanAddComponent;
  let fixture: ComponentFixture<PlanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanAddComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
