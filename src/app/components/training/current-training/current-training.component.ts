import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import * as fromTraining from 'src/app/shared/reducers/training.reducers';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog, private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.startOrResumeExercise();
  }

  startOrResumeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe((take(1))).subscribe((exercise: Exercise) => {
      const step = exercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
  }

  stopCounter() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe((userResponse) => {
      if (userResponse) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeExercise();
      }
    });
  }
}
