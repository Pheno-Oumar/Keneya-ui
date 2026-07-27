import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenPublicationDetail } from './citoyen-publication-detail';

describe('CitoyenPublicationDetail', () => {
  let component: CitoyenPublicationDetail;
  let fixture: ComponentFixture<CitoyenPublicationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitoyenPublicationDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CitoyenPublicationDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
