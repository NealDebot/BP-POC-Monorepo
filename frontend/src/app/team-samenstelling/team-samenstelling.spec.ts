import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSamenstelling } from './team-samenstelling';

describe('TeamSamenstelling', () => {
  let component: TeamSamenstelling;
  let fixture: ComponentFixture<TeamSamenstelling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSamenstelling],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamSamenstelling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
