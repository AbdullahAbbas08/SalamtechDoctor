import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrProfileComponent } from './emr-profile.component';

describe('EmrProfileComponent', () => {
  let component: EmrProfileComponent;
  let fixture: ComponentFixture<EmrProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmrProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
