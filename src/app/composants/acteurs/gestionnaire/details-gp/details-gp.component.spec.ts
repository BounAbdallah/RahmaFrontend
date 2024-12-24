import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGPComponent } from './details-gp.component';

describe('DetailsGPComponent', () => {
  let component: DetailsGPComponent;
  let fixture: ComponentFixture<DetailsGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsGPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
