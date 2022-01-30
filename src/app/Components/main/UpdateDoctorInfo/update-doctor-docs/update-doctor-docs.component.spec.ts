import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorDocsComponent } from './update-doctor-docs.component';

describe('UpdateDoctorDocsComponent', () => {
  let component: UpdateDoctorDocsComponent;
  let fixture: ComponentFixture<UpdateDoctorDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDoctorDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDoctorDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
