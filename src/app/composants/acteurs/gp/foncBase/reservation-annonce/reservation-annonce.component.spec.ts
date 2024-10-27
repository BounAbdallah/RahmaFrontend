import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationAnnonceComponent } from './reservation-annonce.component';

describe('ReservationAnnonceComponent', () => {
  let component: ReservationAnnonceComponent;
  let fixture: ComponentFixture<ReservationAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationAnnonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
