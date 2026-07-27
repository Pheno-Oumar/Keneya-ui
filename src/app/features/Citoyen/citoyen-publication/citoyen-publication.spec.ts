import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenPublication } from './citoyen-publication';

describe('CitoyenPublication', () => {
  let component: CitoyenPublication;
  let fixture: ComponentFixture<CitoyenPublication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitoyenPublication],
    }).compileComponents();

    fixture = TestBed.createComponent(CitoyenPublication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
