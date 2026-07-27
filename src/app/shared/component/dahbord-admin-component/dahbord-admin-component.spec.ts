import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DahbordAdminComponent } from './dahbord-admin-component';

describe('DahbordAdminComponent', () => {
  let component: DahbordAdminComponent;
  let fixture: ComponentFixture<DahbordAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DahbordAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DahbordAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
