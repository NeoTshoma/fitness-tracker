import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSideNav.emit();
  }

  logout() {
    this.onClose();
    this.authService.logout();
  }

}
