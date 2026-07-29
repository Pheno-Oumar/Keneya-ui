import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappelPage } from './rappel-page';

describe('RappelPage', () => {
  let component: RappelPage;
  let fixture: ComponentFixture<RappelPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RappelPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RappelPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

