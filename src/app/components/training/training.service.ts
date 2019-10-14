import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import * as fromTraining from 'src/app/shared/reducers/training.reducers';
import * as UI from 'src/app/shared/actions/ui.action';
import { Store } from '@ngrx/store';
import { SetAvailableTrainings, SetFinishedTrainings, StopTraining, StartTraining } from 'src/app/shared/actions/training.actions';


@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];
  constructor(private db: AngularFirestore,
              private uiService: UIService, private store: Store<fromTraining.State>) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('available-exercises')
     .snapshotChanges().pipe(
       map(docData => {
         return docData.map(document => {
           return {
             id: document.payload.doc.id,
             ...document.payload.doc.data()
           };
         });
       })
     ).subscribe((exercises: Exercise[]) => {
       this.store.dispatch(new UI.StopLoading());
       this.store.dispatch(new SetAvailableTrainings(exercises));
     }, error => {
       this.store.dispatch(new UI.StopLoading());
       this.uiService.showSnackBar('Fetching exercise failed. Please try again later', null, 3000);
     }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe((take(1))).subscribe((ex) => {
      this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
      this.store.dispatch(new StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe((take(1))).subscribe((ex) => {
      this.addDataToDatabase({...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new StopTraining());
    });
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('completed-exercises').valueChanges()
    .subscribe( (exercises: Exercise[]) => {
      this.store.dispatch(new SetFinishedTrainings(exercises));
    }, error => {

    }));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('completed-exercises').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
