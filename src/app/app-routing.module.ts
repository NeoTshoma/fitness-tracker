import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: './components/training/training.module#TrainingModule', canLoad: [
    AuthGuard
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
