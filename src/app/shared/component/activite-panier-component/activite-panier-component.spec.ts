import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitePanierComponent } from './activite-panier-component';

describe('ActivitePanierComponent', () => {
  let component: ActivitePanierComponent;
  let fixture: ComponentFixture<ActivitePanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitePanierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivitePanierComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
