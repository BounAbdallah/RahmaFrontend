import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColisComponent } from './table-colis.component';

describe('TableColisComponent', () => {
  let component: TableColisComponent;
  let fixture: ComponentFixture<TableColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableColisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
