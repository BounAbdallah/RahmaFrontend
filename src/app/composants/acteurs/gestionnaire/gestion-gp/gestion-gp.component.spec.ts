import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGPComponent } from './gestion-gp.component';

describe('GestionGPComponent', () => {
  let component: GestionGPComponent;
  let fixture: ComponentFixture<GestionGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionGPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
