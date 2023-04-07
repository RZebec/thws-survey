import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { routes } from 'src/app/consts';
import { UserDetails } from 'src/app/models/userDetails';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user!: UserDetails;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;
  public flatlogicEmail: string = 'https://flatlogic.com';

  public signOutEmit(): void {
    this.signOut.emit();
  }
}
