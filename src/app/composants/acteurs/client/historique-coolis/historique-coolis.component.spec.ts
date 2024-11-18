import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCoolisComponent } from './historique-coolis.component';

describe('HistoriqueCoolisComponent', () => {
  let component: HistoriqueCoolisComponent;
  let fixture: ComponentFixture<HistoriqueCoolisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueCoolisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueCoolisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
