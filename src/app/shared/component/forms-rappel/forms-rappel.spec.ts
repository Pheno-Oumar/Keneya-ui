import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsRappel } from './forms-rappel';

describe('FormsRappel', () => {
  let component: FormsRappel;
  let fixture: ComponentFixture<FormsRappel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsRappel],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsRappel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
