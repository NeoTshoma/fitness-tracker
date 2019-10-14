import {  NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from 'src/app/shared/reducers/training.reducers';


@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent,
    StopTrainingComponent,
    CurrentTrainingComponent
  ],
  imports: [
    SharedModule,
    AngularFirestoreModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
