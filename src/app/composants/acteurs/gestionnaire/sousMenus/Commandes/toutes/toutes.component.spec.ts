import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToutesComponent } from './toutes.component';

describe('ToutesComponent', () => {
  let component: ToutesComponent;
  let fixture: ComponentFixture<ToutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToutesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
