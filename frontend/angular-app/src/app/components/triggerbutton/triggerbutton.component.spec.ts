import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerbuttonComponent } from './triggerbutton.component';

describe('TriggerbuttonComponent', () => {
  let component: TriggerbuttonComponent;
  let fixture: ComponentFixture<TriggerbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
