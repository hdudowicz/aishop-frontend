import { Prediction, PredictionsDTO } from './../../model/prediction.model';
import { Observable, interval, switchMap, takeUntil, Subject } from 'rxjs';
import { PredictionsService } from './../services/predictions.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-predictions-list',
  templateUrl: './predictions-list.component.html',
  styleUrls: ['./predictions-list.component.scss']
})
export class PredictionsListComponent implements OnInit, OnDestroy {
  ngDestroy$ = new Subject();

  predictions: Prediction[] = []

  constructor(private predictionService: PredictionsService){}

  ngOnInit(): void {
      this.startPollingPredictions();
  }

  ngOnDestroy(): void {
      this.ngDestroy$.next(null);
      this.ngDestroy$.complete();
  }

  getAllPredictions(): Observable<PredictionsDTO>{
    return this.predictionService.getAllPredictions();
  }

  startPollingPredictions(): void{
    interval(2000).pipe(
      switchMap(() => this.getAllPredictions()),
      takeUntil(this.ngDestroy$)
    ).subscribe(res => {
      this.predictions = res?.predictions ?? []
    })
  }

}
