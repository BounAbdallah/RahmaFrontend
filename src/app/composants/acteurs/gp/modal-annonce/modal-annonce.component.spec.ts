import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnnonceComponent } from './modal-annonce.component';

describe('ModalAnnonceComponent', () => {
  let component: ModalAnnonceComponent;
  let fixture: ComponentFixture<ModalAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAnnonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
