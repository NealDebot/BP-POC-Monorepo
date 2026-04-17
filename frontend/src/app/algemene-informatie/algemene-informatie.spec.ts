import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgemeneInformatie } from './algemene-informatie';

describe('AlgemeneInformatie', () => {
  let component: AlgemeneInformatie;
  let fixture: ComponentFixture<AlgemeneInformatie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgemeneInformatie],
    }).compileComponents();

    fixture = TestBed.createComponent(AlgemeneInformatie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
