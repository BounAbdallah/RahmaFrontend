import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLivraisonGpComponent } from './detail-livraison-gp.component';

describe('DetailLivraisonGpComponent', () => {
  let component: DetailLivraisonGpComponent;
  let fixture: ComponentFixture<DetailLivraisonGpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLivraisonGpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailLivraisonGpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
