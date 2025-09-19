import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import {
  Card as CardType,
  CardLayout,
  DeviceItem,
  SensorItem,
} from '@models/index';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardHorizontal } from './card-horizontal/card-horizontal';
import { CardVertical } from './card-vertical/card-vertical';
import { CardDevice } from './card-device/card-device';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DashboardFacade } from '@store/dashboard/dashboard.facade';
import { Overlay } from '@angular/cdk/overlay';
import { EditCardDialog } from './dialogs/edit-card-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ItemListFacade } from '@store/item-list/item-list.facade';

@Component({
  selector: 'app-card',
  imports: [
    MatIconModule,
    MatSlideToggleModule,
    CardHorizontal,
    CardVertical,
    CardDevice,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true,
})
export class Card implements OnInit {
  @Input() tabId!: string;
  dashboardFacade: DashboardFacade = inject(DashboardFacade);
  itemListFacade: ItemListFacade = inject(ItemListFacade);
  @Input() items: (SensorItem | DeviceItem)[] = [];
  private dialogRef!: MatDialogRef<EditCardDialog>;
  dialog: MatDialog = inject(MatDialog);
  overlay: Overlay = inject(Overlay);
  error: string = '';
  readonly layoutEnum = CardLayout;
  readonly itemList = this.itemListFacade.itemList;
  readonly cardSignal = signal<CardType>({} as CardType);

  @Input()
  set card(value: CardType) {
    this.cardSignal.set(value);
  }
  get card(): CardType {
    return this.cardSignal();
  }

  readonly deviceItems = computed(() => {
    const card = this.cardSignal();
    const items = this.itemList();
    if (!card || !card.items) return [];
    return items.filter((i): i is DeviceItem =>
      card.items?.some((c) => c.id === i.id && i.type === 'device'),
    );
  });

  readonly hasMultipleDevices = computed(() => this.deviceItems().length >= 2);

  readonly isMasterToggleOn = computed(() =>
    this.deviceItems().some((d) => d.type === 'device' && d.state),
  );

  ngOnInit(): void {
    this.itemListFacade.loadItemList();
  }

  isSensor(item: SensorItem | DeviceItem): item is SensorItem {
    return item.type === 'sensor';
  }

  isDevice(item: SensorItem | DeviceItem): item is DeviceItem {
    return item.type === 'device';
  }

  onMoveCardClick(cardId: string, direction: 'left' | 'right') {
    this.dashboardFacade.reorderCard(this.tabId, cardId, direction);
  }

  onEditCardClick() {
    this.error = '';
    this.dialogRef = this.dialog.open(EditCardDialog, {
      width: '400px',
      panelClass: 'dialog-container',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: { card: this.card },
    });

    this.dialogRef
      .afterClosed()
      .subscribe((updatedCard: CardType | undefined) => {
        if (updatedCard) {
          this.dashboardFacade.updateCard(this.tabId, updatedCard);
          this.cardSignal.set(updatedCard);
        }
      });
  }

  onDeleteCardClick(cardId: string) {
    this.dashboardFacade.deleteCard(this.tabId, cardId);
  }

  onDeviceToggle = (item: DeviceItem, newState: boolean): void => {
    this.itemListFacade.toggleItemState(item.id, newState);
  };

  onMasterToggle(state: boolean): void {
    for (const device of this.deviceItems()) {
      this.itemListFacade.toggleItemState(device.id, state);
    }
  }
}
