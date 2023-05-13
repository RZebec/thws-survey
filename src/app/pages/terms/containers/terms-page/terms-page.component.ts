import { Component } from '@angular/core';
import { getPrivacyText } from '../../models/privacy-text';
import { MatDialog } from '@angular/material/dialog';
import { TermsModalComponent } from '../../components/modals/terms-modal/terms-modal.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { routes as constRoutes } from '../../../../consts/routes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.scss'],
})
export class TermsPageComponent {
  constructor(
    public dialog: MatDialog,
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(TermsModalComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  async acceptPolicy() {
    this.databaseService.updateUserAcceptedTerms(true);
    this.databaseService.updateUserStep(1);
    this.router.navigateByUrl(constRoutes.TODO);
  }
}
