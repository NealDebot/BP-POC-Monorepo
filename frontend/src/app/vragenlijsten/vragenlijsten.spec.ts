import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vragenlijsten } from './vragenlijsten';

describe('Vragenlijsten', () => {
  let component: Vragenlijsten;
  let fixture: ComponentFixture<Vragenlijsten>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vragenlijsten],
    }).compileComponents();

    fixture = TestBed.createComponent(Vragenlijsten);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
