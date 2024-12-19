import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiseterChauffeurComponent } from './regiseter-chauffeur.component';

describe('RegiseterChauffeurComponent', () => {
  let component: RegiseterChauffeurComponent;
  let fixture: ComponentFixture<RegiseterChauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegiseterChauffeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegiseterChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
