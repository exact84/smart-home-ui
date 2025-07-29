import { Component, Input, signal } from '@angular/core';
import { Tab } from '../../../interfaces/dashboard.model';
import { CardList } from '../card-list/card-list';

@Component({
  selector: 'app-tab-switcher',
  imports: [CardList],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  @Input() tabs: Tab[] = [];
  readonly activeTabIndex = signal(0);

  get activeTab(): Tab | undefined {
    const index = this.activeTabIndex();
    return this.tabs.length > index ? this.tabs[index] : undefined;
  }

  selectTab(index: number): void {
    this.activeTabIndex.set(index);
  }
}
