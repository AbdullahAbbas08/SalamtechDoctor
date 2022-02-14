import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAppointmentComponent } from './filter-appointment.component';

describe('FilterAppointmentComponent', () => {
  let component: FilterAppointmentComponent;
  let fixture: ComponentFixture<FilterAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
