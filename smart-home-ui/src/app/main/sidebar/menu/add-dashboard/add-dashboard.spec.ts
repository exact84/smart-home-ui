import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboard } from './add-dashboard';

describe('AddDashboard', () => {
  let component: AddDashboard;
  let fixture: ComponentFixture<AddDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
