import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvellesComponent } from './nouvelles.component';

describe('NouvellesComponent', () => {
  let component: NouvellesComponent;
  let fixture: ComponentFixture<NouvellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvellesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouvellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
