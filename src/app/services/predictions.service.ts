import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prediction, PredictionsDTO } from 'src/model/prediction.model';
import { SERVER_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  constructor(private http: HttpClient) { }

  getAllPredictions(): Observable<PredictionsDTO> {
    return this.http.get(SERVER_URL + "/predictions");
  }

  getPredictionImage(id: number): Observable<any>{
    let params = new HttpParams();
    params.append("id", id);
    return this.http.get(SERVER_URL + "/get-image", { params });
  }
}
