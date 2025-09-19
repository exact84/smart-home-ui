import {
  Component,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DashboardList } from '@models/dashboard-list.model';
import { Overlay } from '@angular/cdk/overlay';
import { createDashboard } from '@store/dashboard-list/dashboard-list.actions';
import { Store } from '@ngrx/store';
import { DashboardService } from '@services/dashboard';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dashboard',
  imports: [
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './add-dashboard.html',
  styleUrl: './add-dashboard.scss',
})
export class AddDashboard {
  newDashboardFlag = signal(false);
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<
    MatDialogRef<DashboardList>
  >;
  private dialogRef!: MatDialogRef<unknown>;
  dialog: MatDialog = inject(MatDialog);
  overlay: Overlay = inject(Overlay);
  store = inject(Store);
  dashboard = inject(DashboardService);

  id = '';
  title = '';
  icon = '';
  error = '';
  router: Router = inject(Router);

  onNewDashboardClick() {
    this.newDashboardFlag.set(true);
    this.error = '';
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px',
      panelClass: 'dialog-container',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
  }

  submit(): void {
    const dashboard: DashboardList = {
      id: this.id.trim(),
      title: this.title.trim(),
      icon: this.icon.trim(),
    };

    if (
      !dashboard.icon ||
      !dashboard.title ||
      !dashboard.id ||
      dashboard.title.length > 50 ||
      dashboard.id.length > 30
    ) {
      this.error = 'Fill all fields. Max Title length: 20, max ID length: 30';
      return;
    }

    this.dashboard
      .checkDashboardUnique(dashboard.id, dashboard.title)
      .pipe(take(1))
      .subscribe((isUnique) => {
        if (!isUnique) {
          this.error = 'Dublicate ID or title';
          return;
        }

        this.store.dispatch(
          createDashboard({
            dashboard,
          }),
        );
        this.dialogRef.close();
        this.router.navigate(['/dashboard', dashboard.id]);
      });
  }

  closeDialog() {
    this.id = '';
    this.title = '';
    this.icon = '';
    this.dialogRef.close();
  }
}
