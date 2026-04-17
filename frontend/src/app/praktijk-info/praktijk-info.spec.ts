import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraktijkInfo } from './praktijk-info';

describe('PraktijkInfo', () => {
  let component: PraktijkInfo;
  let fixture: ComponentFixture<PraktijkInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PraktijkInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(PraktijkInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
