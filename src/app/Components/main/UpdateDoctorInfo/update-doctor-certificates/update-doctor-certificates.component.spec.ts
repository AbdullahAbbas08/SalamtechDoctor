import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorCertificatesComponent } from './update-doctor-certificates.component';

describe('UpdateDoctorCertificatesComponent', () => {
  let component: UpdateDoctorCertificatesComponent;
  let fixture: ComponentFixture<UpdateDoctorCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDoctorCertificatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDoctorCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
