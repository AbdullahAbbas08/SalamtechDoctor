import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrComponent } from './emr.component';

describe('EmrComponent', () => {
  let component: EmrComponent;
  let fixture: ComponentFixture<EmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
