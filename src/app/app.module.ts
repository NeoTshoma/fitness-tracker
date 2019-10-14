import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationHeaderComponent } from './components/navigation/navigation-header/navigation-header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './components/auth/auth.service';
import { TrainingService } from './components/training/training.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { UIService } from './shared/ui.service';
import { AuthModule } from './components/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavigationHeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],

})
export class AppModule { }
