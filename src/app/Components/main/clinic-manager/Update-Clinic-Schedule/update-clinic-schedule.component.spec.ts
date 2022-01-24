import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClinicScheduleComponent } from './update-clinic-schedule.component';

describe('UpdateClinicScheduleComponent', () => {
  let component: UpdateClinicScheduleComponent;
  let fixture: ComponentFixture<UpdateClinicScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClinicScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClinicScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
