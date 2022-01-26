import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorInfoComponent } from './update-doctor-info.component';

describe('UpdateDoctorInfoComponent', () => {
  let component: UpdateDoctorInfoComponent;
  let fixture: ComponentFixture<UpdateDoctorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDoctorInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDoctorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
