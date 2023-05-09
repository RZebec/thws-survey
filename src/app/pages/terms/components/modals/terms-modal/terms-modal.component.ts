import { Component } from '@angular/core';
import { getPrivacyText } from '../../../models/privacy-text';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss'],
})
export class TermsModalComponent {
  privacyText = '';

  constructor() {
    this.privacyText = getPrivacyText();
  }
}
