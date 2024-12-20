import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactifsComponent } from './inactifs.component';

describe('InactifsComponent', () => {
  let component: InactifsComponent;
  let fixture: ComponentFixture<InactifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactifsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InactifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
