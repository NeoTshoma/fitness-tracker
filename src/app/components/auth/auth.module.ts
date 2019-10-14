import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule {

}
