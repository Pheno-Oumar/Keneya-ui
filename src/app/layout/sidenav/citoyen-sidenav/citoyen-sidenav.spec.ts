import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenSidenav } from './citoyen-sidenav';

describe('CitoyenSidenav', () => {
  let component: CitoyenSidenav;
  let fixture: ComponentFixture<CitoyenSidenav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitoyenSidenav],
    }).compileComponents();

    fixture = TestBed.createComponent(CitoyenSidenav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
