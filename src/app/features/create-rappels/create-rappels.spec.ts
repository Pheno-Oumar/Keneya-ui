import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRappelsComponent } from './create-rappels';

describe('CreateRappelsComponent', () => {
  let component: CreateRappelsComponent;
  let fixture: ComponentFixture<CreateRappelsComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRappelsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRappelsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});