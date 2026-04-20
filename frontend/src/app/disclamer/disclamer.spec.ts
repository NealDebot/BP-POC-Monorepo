import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Disclamer } from './disclamer';

describe('Disclamer', () => {
  let component: Disclamer;
  let fixture: ComponentFixture<Disclamer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Disclamer],
    }).compileComponents();

    fixture = TestBed.createComponent(Disclamer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
