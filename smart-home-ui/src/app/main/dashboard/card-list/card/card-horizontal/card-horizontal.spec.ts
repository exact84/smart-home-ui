import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHorizontal } from './card-horizontal';

describe('CardHorizontal', () => {
  let component: CardHorizontal;
  let fixture: ComponentFixture<CardHorizontal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHorizontal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHorizontal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
