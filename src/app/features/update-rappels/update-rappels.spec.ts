import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRappels } from './update-rappels';

describe('UpdateRappels', () => {
  let component: UpdateRappels;
  let fixture: ComponentFixture<UpdateRappels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRappels],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateRappels);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
