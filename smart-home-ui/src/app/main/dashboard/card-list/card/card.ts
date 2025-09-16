import { Component, inject, Input } from '@angular/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() card!: CardType;
  @Input() tabId!: string;
  facade: DashboardFacade = inject(DashboardFacade);
  @Input() items: (SensorItem | DeviceItem)[] = [];
  private dialogRef!: MatDialogRef<unknown>;
  dialog: MatDialog = inject(MatDialog);
  overlay: Overlay = inject(Overlay);
  error: string = '';
  title: string = '';

  isSensor(item: SensorItem | DeviceItem): item is SensorItem {
    return item.type === 'sensor';
  }

  isDevice(item: SensorItem | DeviceItem): item is DeviceItem {
    return item.type === 'device';
  }
  readonly layoutEnum = CardLayout;

  hasAnyState(): boolean {
    return this.card.items.filter((item) => 'state' in item).length >= 2;
  }

  get areAllDevicesOn(): boolean {
    const result = this.card.items
      .filter((item) => 'state' in item)
      .some((item) => item.state === true);
    return result;
  }

  toggleAllDevices(state: boolean): void {
    for (const item of this.card.items) {
      if ('state' in item) {
        item.state = state;
      }
    }
  }

  onToggleDeviceState(item: DeviceItem, newState: boolean): void {
    item.state = newState;
  }

  onMoveCardClick(cardId: string, direction: 'left' | 'right') {
    this.facade.reorderCard(this.tabId, cardId, direction);
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

    this.dialogRef.afterClosed().subscribe((updatedCard?: CardType) => {
      if (updatedCard) {
        this.card = updatedCard; // надо, нет?
        // this.facade.updateCard(updatedCard);
      }
    });
  }

  onDeleteCardClick(cardId: string) {
    this.facade.deleteCard(this.tabId, cardId);
  }
}
