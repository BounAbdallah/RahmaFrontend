import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReservationVoitureComponent } from './detail-reservation-voiture.component';

describe('DetailReservationVoitureComponent', () => {
  let component: DetailReservationVoitureComponent;
  let fixture: ComponentFixture<DetailReservationVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailReservationVoitureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailReservationVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
