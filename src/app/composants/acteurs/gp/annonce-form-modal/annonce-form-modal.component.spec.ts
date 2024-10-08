import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceFormModalComponent } from './annonce-form-modal.component';

describe('AnnonceFormModalComponent', () => {
  let component: AnnonceFormModalComponent;
  let fixture: ComponentFixture<AnnonceFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnonceFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnonceFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
