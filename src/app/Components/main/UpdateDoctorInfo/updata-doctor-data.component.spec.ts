import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataDoctorDataComponent } from './updata-doctor-data.component';

describe('UpdataDoctorDataComponent', () => {
  let component: UpdataDoctorDataComponent;
  let fixture: ComponentFixture<UpdataDoctorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdataDoctorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdataDoctorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
