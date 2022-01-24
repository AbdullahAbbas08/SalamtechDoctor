import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainClinicComponent } from './main-clinic.component';

describe('MainClinicComponent', () => {
  let component: MainClinicComponent;
  let fixture: ComponentFixture<MainClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainClinicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
