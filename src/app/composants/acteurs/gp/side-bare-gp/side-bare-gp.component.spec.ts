import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBareGPComponent } from './side-bare-gp.component';

describe('SideBareGPComponent', () => {
  let component: SideBareGPComponent;
  let fixture: ComponentFixture<SideBareGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBareGPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBareGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
