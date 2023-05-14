import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @Input()
  title: string = '';

  toggleDark = false;

  public isShowSidebar: boolean = false;
  public mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    // this.isShowSidebar = !this.mobileQuery.matches;
    this.isShowSidebar = false;
  }

  public getMode() {
    const mode = this.mobileQuery.matches ? 'over' : 'side';
    return false ? 'over' : 'side';
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);

    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}
