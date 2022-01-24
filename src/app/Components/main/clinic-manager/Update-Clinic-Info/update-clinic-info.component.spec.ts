import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClinicInfoComponent } from './update-clinic-info.component';

describe('UpdateClinicInfoComponent', () => {
  let component: UpdateClinicInfoComponent;
  let fixture: ComponentFixture<UpdateClinicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClinicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClinicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
