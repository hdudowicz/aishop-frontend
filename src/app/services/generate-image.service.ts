import { Prediction } from './../../model/prediction.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { PredictionStatus } from 'src/model/prediction-status.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateImageService {
  serverUrl = "http://localhost:8080"
  apiKey = "0ljHXDUqqP4NfbNbWV0nT1gl4RNAkNsG3Knu8Fcn";

  constructor(
    private http: HttpClient
  ) { }

  generateImage(prompt: string): Observable<PredictionStatus> {
    return this.http.get<PredictionStatus>(`${this.serverUrl}/status`);
  }

  generateImageFromPrompt(prompt: string): Observable<PredictionStatus> {
    var params = new HttpParams()
    params.set("prompt", prompt)
    return this.http.post<PredictionStatus>(`${this.serverUrl}/generate`, {text: prompt})
  }

  getStatus(id: string): Observable<Prediction> {
    var params = new HttpParams().set("id", id)
    return this.http.get<Prediction>(`${this.serverUrl}/status`, { params });
  }

  uploadImage(base64_img: string): Observable<any> {
    const httpHeaders = new HttpHeaders()
    httpHeaders.append("Content-Type", `application/json`)
    httpHeaders.append("Authorization", `Bearer ${this.apiKey}`)
    return this.http.post(`https://teemill.com/omnis/v3/product/create`, JSON.stringify({
      image_url: base64_img,
      item_code: "RNA1",
      name: "Doodle Tee",
      colours: "White",
      description: "Check out this awesome AI generated t-shirt, printed on an organic cotton t-shirt in a renewable energy powered factory, created via the Teemill API.",
      price: 20.00,
    }), {headers: httpHeaders})
  }
}
