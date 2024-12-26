import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RDetailsComponent } from './r-details.component';

describe('RDetailsComponent', () => {
  let component: RDetailsComponent;
  let fixture: ComponentFixture<RDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
