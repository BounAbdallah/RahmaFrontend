import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatReservationComponent } from './stat-reservation.component';

describe('StatReservationComponent', () => {
  let component: StatReservationComponent;
  let fixture: ComponentFixture<StatReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
