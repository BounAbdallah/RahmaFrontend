import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuleesComponent } from './annulees.component';

describe('AnnuleesComponent', () => {
  let component: AnnuleesComponent;
  let fixture: ComponentFixture<AnnuleesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnuleesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnuleesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
