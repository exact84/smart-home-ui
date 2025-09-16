import { Component, Inject, inject, Input } from '@angular/core';
import {
  Card as CardType,
  CardLayout,
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
  ],
  templateUrl: './edit-card-dialog.html',
  styleUrl: './edit-card-dialog.scss',
})
export class EditCardDialog {
  title: string = '';
  items: (SensorItem | DeviceItem)[] = [];
  @Input() card!: CardType;
  newItemLabel: string = '';

  constructor(
    private dialogRef: MatDialogRef<EditCardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { card: CardType },
  ) {
    this.card = data.card;
    this.title = data.card.title;
    this.items = [...data.card.items];
  }

  ngOnInit() {
    this.title = this.card.title;
    this.items = [...this.card.items];
  }

  addItem() {
    // Добавить новый итем
  }

  removeItem(index: number) {
    throw new Error('Method not implemented.');
  }

  save() {
    const updatedCard: CardType = {
      ...this.card,
      title: this.title,
      items: this.items,
    };
    this.dialogRef.close(updatedCard);
  }

  cancel() {
    this.dialogRef.close(); // отмена
  }
}
