import { Component, inject, Input, OnInit } from '@angular/core';
import {
  CardLayout,
  Card as CardType,
  DeviceItem,
  SensorItem,
} from '@models/index';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ItemListFacade } from '@store/item-list/item-list.facade';

@Component({
  selector: 'app-edit-card-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './edit-card-dialog.html',
  styleUrl: './edit-card-dialog.scss',
})
export class EditCardDialog implements OnInit {
  cardCopy: CardType;
  @Input() card!: CardType;
  newItemId: string | undefined = undefined;
  itemListFacade = inject(ItemListFacade);
  data = inject<{ card: CardType }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<EditCardDialog>);
  items: (SensorItem | DeviceItem)[] = [];
  readonly CardLayout = CardLayout;

  constructor() {
    this.cardCopy = {
      ...this.data.card,
      items: this.data.card.items.map((i) => ({ ...i })),
    };
  }

  ngOnInit() {
    // Exclude device items from horizontal cards
    const allItems = this.itemListFacade.itemList();
    this.items =
      this.data.card.layout === CardLayout.Horizontal
        ? allItems.filter((i) => i.type !== 'device')
        : allItems;
  }

  addItem() {
    if (!this.newItemId) return;
    const entity = this.itemListFacade
      .itemList()
      .find((e) => e.id === this.newItemId);
    if (entity) {
      this.cardCopy.items.push({ ...entity });
      this.newItemId = undefined;
    }
  }

  removeItem(index: number) {
    this.cardCopy.items.splice(index, 1);
  }

  save() {
    this.cardCopy.title = this.cardCopy.title.slice(0, 50);
    this.dialogRef.close(this.cardCopy);
  }

  cancel() {
    this.dialogRef.close();
  }
}
