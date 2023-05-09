import { Component } from '@angular/core';
import { getPrivacyText } from '../../models/privacy-text';
import { MatDialog } from '@angular/material/dialog';
import { TermsModalComponent } from '../../components/modals/terms-modal/terms-modal.component';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.scss'],
})
export class TermsPageComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(TermsModalComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
