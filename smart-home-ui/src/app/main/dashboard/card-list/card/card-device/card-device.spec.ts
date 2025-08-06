import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDevice } from './card-device';

describe('CardDevice', () => {
  let component: CardDevice;
  let fixture: ComponentFixture<CardDevice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDevice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDevice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
