import {
  Component,
  inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Card, CardLayout, DeviceItem } from '@models/index';
import { Card as CardComponent } from './card/card';
import { HighlightActive } from '@directives/highlight-active';
import { DashboardFacade } from '@store/dashboard/dashboard.facade';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DashboardList } from '@models/dashboard-list.model';
import { Overlay } from '@angular/cdk/overlay';
import { DashboardService } from '@services/dashboard';
import { CreateCardDialog } from './dialogs/create-card-dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-card-list',
  imports: [
    CardComponent,
    HighlightActive,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
  ],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<
    MatDialogRef<DashboardList>
  >;
  private dialogRef!: MatDialogRef<CreateCardDialog>;
  facade: DashboardFacade = inject(DashboardFacade);
  @Input() cards: Card[] = [];
  @Input() tabId: string = '';
  dialog: MatDialog = inject(MatDialog);
  overlay: Overlay = inject(Overlay);
  dashboard = inject(DashboardService);

  error = '';
  layout: CardLayout | undefined = undefined;
  readonly CardLayout = CardLayout;

  closeDialog() {
    this.layout = undefined;
    this.dialogRef.close();
  }

  hasActiveDevice(card: Card): boolean {
    return card.items.some(
      (item): item is DeviceItem =>
        item.type === 'device' && item.state === true,
    );
  }

  onAddCardClick() {
    this.error = '';
    this.dialogRef = this.dialog.open(CreateCardDialog, {
      width: '350px',
      height: '520px',
      panelClass: 'dialog-container',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });

    this.dialogRef.afterClosed().subscribe((layout?: CardLayout) => {
      if (layout) {
        const title = 'New Card';
        const newCard: Card = {
          id: title.toLocaleLowerCase().replaceAll(/\s+/g, '-') + Math.random(),
          title,
          items: [],
          layout,
        };
        this.facade.addCard(this.tabId, newCard);
      }
    });
  }
}
