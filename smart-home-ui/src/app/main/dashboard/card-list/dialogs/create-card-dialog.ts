import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CardLayout } from '@models/card.model';

@Component({
  selector: 'app-create-card-dialog',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatDialogModule],
  templateUrl: './create-card-dialog.html',
  styleUrl: './create-card-dialog.scss',
})
export class CreateCardDialog {
  dialogRef = inject(MatDialogRef<CreateCardDialog>);
  readonly CardLayout = CardLayout;
  selectedLayout: CardLayout | undefined = undefined;

  selectLayout(layout: CardLayout) {
    this.selectedLayout = layout;
    this.dialogRef.close(layout);
  }

  cancel() {
    this.dialogRef.close();
  }
}
