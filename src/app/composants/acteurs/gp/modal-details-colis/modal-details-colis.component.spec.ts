import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsColisComponent } from './modal-details-colis.component';

describe('ModalDetailsColisComponent', () => {
  let component: ModalDetailsColisComponent;
  let fixture: ComponentFixture<ModalDetailsColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetailsColisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDetailsColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
