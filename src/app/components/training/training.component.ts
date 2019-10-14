import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/shared/reducers/training.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean>;

  constructor(private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

}
