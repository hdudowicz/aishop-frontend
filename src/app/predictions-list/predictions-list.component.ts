import { Prediction, PredictionsDTO } from './../../model/prediction.model';
import { Observable, interval, switchMap, takeUntil, Subject } from 'rxjs';
import { PredictionsService } from './../services/predictions.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RefreshingTable } from '../common/refreshing-table.mode';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-predictions-list',
  templateUrl: './predictions-list.component.html',
  styleUrls: ['./predictions-list.component.scss']
})
export class PredictionsListComponent implements OnInit, OnDestroy, RefreshingTable {
  ngDestroy$ = new Subject();

  predictions: Prediction[] = []

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = "";
  sortKey: string = "";


  constructor(private predictionService: PredictionsService){}

  ngOnInit(): void {
    // this.startPollingPredictions();
    this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];
  }

  ngOnDestroy(): void {
      this.ngDestroy$.next(null);
      this.ngDestroy$.complete();
  }

  getAllPredictions(): Observable<PredictionsDTO>{
    return this.predictionService.getAllPredictions();
  }

  refresh(){
    this.predictionService.getAllPredictions().subscribe(res => {
      this.predictions = res?.predictions ?? []
    });
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  startPollingPredictions(): void{
    interval(2000).pipe(
      switchMap(() => this.getAllPredictions()),
      takeUntil(this.ngDestroy$)
    ).subscribe(res => {
      this.predictions = res?.predictions ?? []
    });
  }

}
