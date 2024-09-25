/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopBareComponent } from './topBare.component';

describe('TopBareComponent', () => {
  let component: TopBareComponent;
  let fixture: ComponentFixture<TopBareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
