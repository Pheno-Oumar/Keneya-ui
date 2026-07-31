import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCitoyen } from './header-citoyen';

describe('HeaderCitoyen', () => {
  let component: HeaderCitoyen;
  let fixture: ComponentFixture<HeaderCitoyen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCitoyen],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCitoyen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

