import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGPComponent } from './dashboard-gp.component';

describe('DashboardGPComponent', () => {
  let component: DashboardGPComponent;
  let fixture: ComponentFixture<DashboardGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
