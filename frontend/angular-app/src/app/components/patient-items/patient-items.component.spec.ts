import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientItemsComponent } from './patient-items.component';

describe('PatientItemsComponent', () => {
  let component: PatientItemsComponent;
  let fixture: ComponentFixture<PatientItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
