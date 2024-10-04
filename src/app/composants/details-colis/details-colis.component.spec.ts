import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsColisComponent } from './details-colis.component';

describe('DetailsColisComponent', () => {
  let component: DetailsColisComponent;
  let fixture: ComponentFixture<DetailsColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsColisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
