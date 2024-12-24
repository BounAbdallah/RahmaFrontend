import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilGestionnaireComponent } from './accueil-gestionnaire.component';

describe('AccueilGestionnaireComponent', () => {
  let component: AccueilGestionnaireComponent;
  let fixture: ComponentFixture<AccueilGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilGestionnaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
