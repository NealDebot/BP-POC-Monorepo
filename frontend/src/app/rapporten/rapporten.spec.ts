import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapporten } from './rapporten';

describe('Rapporten', () => {
  let component: Rapporten;
  let fixture: ComponentFixture<Rapporten>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rapporten],
    }).compileComponents();

    fixture = TestBed.createComponent(Rapporten);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
