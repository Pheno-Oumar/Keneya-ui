import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappelsList } from './rappels-list';

describe('RappelsList', () => {
  let component: RappelsList;
  let fixture: ComponentFixture<RappelsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RappelsList],
    }).compileComponents();

    fixture = TestBed.createComponent(RappelsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

