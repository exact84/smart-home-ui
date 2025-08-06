import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVertical } from './card-vertical';

describe('CardVertical', () => {
  let component: CardVertical;
  let fixture: ComponentFixture<CardVertical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVertical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVertical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
