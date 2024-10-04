import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceGPComponent } from './annonce-gp.component';

describe('AnnonceGPComponent', () => {
  let component: AnnonceGPComponent;
  let fixture: ComponentFixture<AnnonceGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnonceGPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnonceGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
