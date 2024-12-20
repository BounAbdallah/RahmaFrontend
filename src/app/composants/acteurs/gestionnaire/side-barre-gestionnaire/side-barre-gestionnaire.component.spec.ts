import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarreGestionnaireComponent } from './side-barre-gestionnaire.component';

describe('SideBarreGestionnaireComponent', () => {
  let component: SideBarreGestionnaireComponent;
  let fixture: ComponentFixture<SideBarreGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarreGestionnaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarreGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
