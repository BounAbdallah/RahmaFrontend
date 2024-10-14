import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiseterGPComponent } from './regiseter-gp.component';

describe('RegiseterGPComponent', () => {
  let component: RegiseterGPComponent;
  let fixture: ComponentFixture<RegiseterGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegiseterGPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegiseterGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
