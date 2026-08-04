import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationAdminComponent } from './publication-admin-component';

describe('PublicationComponent', () => {
  let component: PublicationAdminComponent;
  let fixture: ComponentFixture<PublicationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
