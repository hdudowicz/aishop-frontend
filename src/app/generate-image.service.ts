import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { PredictionStatus } from 'src/model/prediction-status.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateImageService {
  serverUrl = "http://localhost:8080"

  constructor(
    private http: HttpClient
  ) { }

  generateImage(prompt: string): Observable<PredictionStatus> {
    return this.http.get<PredictionStatus>(`${this.serverUrl}/status`);
  }

  generateImageFromPrompt(prompt: string): Observable<PredictionStatus> {
    var params = new HttpParams()
    params.set("prompt", prompt)
    return this.http.post<PredictionStatus>(`${this.serverUrl}/generate`, null, { params })
  }

  getStatus(id: string): Observable<PredictionStatus> {
    var params = new HttpParams().set("id", id)
    return this.http.get<PredictionStatus>(`${this.serverUrl}/status`, { params });
  }
}
