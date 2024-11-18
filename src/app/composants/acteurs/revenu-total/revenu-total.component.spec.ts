import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuTotalComponent } from './revenu-total.component';

describe('RevenuTotalComponent', () => {
  let component: RevenuTotalComponent;
  let fixture: ComponentFixture<RevenuTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenuTotalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevenuTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
