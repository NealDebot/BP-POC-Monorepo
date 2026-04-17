import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraktijkKenmerken } from './praktijk-kenmerken';

describe('PraktijkKenmerken', () => {
  let component: PraktijkKenmerken;
  let fixture: ComponentFixture<PraktijkKenmerken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PraktijkKenmerken],
    }).compileComponents();

    fixture = TestBed.createComponent(PraktijkKenmerken);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
