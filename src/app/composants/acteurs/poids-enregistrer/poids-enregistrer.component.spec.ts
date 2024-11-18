import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoidsEnregistrerComponent } from './poids-enregistrer.component';

describe('PoidsEnregistrerComponent', () => {
  let component: PoidsEnregistrerComponent;
  let fixture: ComponentFixture<PoidsEnregistrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoidsEnregistrerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoidsEnregistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
