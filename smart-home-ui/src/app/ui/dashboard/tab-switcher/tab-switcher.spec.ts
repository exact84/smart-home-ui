import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSwitcher } from './tab-switcher';

describe('TabSwitcher', () => {
  let component: TabSwitcher;
  let fixture: ComponentFixture<TabSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSwitcher],
    }).compileComponents();

    fixture = TestBed.createComponent(TabSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
