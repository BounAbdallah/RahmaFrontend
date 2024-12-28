import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueDensembleComponent } from './vue-densemble.component';

describe('VueDensembleComponent', () => {
  let component: VueDensembleComponent;
  let fixture: ComponentFixture<VueDensembleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VueDensembleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VueDensembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
