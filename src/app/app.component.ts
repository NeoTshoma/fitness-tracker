import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openSidenav = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
