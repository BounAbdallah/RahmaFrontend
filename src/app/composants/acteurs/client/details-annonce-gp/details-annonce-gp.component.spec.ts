import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnnonceGPComponent } from './details-annonce-gp.component';

describe('DetailsAnnonceGPComponent', () => {
  let component: DetailsAnnonceGPComponent;
  let fixture: ComponentFixture<DetailsAnnonceGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAnnonceGPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsAnnonceGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
