import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit {
  @Output() showSideNav = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }
  isAuthenticated$: Observable<boolean>;

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  }

  toggleSideNavigation() {
    this.showSideNav.emit();
  }

  logout() {
    this.authService.logout();
  }

}
