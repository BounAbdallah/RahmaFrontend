import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GPReservationComponent } from './gp-reservation.component';

describe('GPReservationComponent', () => {
  let component: GPReservationComponent;
  let fixture: ComponentFixture<GPReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GPReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GPReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
