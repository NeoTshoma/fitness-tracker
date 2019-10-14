import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/shared/reducers/training.reducers';
import * as fromRoot from 'src/app/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
