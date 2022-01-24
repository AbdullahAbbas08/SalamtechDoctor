import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClinicGalaryComponent } from './update-clinic-galary.component';

describe('UpdateClinicGalaryComponent', () => {
  let component: UpdateClinicGalaryComponent;
  let fixture: ComponentFixture<UpdateClinicGalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClinicGalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClinicGalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
