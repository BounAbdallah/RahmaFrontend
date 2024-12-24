import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnnairDetailsAnnonceGPComponent } from './gestionnaire-details-annonce-gp.component';

describe('GestionnnairDetailsAnnonceGPComponent', () => {
  let component: GestionnnairDetailsAnnonceGPComponent;
  let fixture: ComponentFixture<GestionnnairDetailsAnnonceGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnnairDetailsAnnonceGPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnnairDetailsAnnonceGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
