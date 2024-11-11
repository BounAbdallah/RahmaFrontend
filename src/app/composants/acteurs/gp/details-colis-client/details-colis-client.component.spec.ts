import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsColisClientComponent } from './details-colis-client.component';

describe('DetailsColisClientComponent', () => {
  let component: DetailsColisClientComponent;
  let fixture: ComponentFixture<DetailsColisClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsColisClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsColisClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
