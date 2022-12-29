import { PredictionStatus } from 'src/model/prediction-status.model';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Image } from 'primeng/image';
import { interval, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { GenerateImageService } from '../generate-image.service';

@Component({
  selector: 'app-image-generate-preview',
  templateUrl: './image-generate-preview.component.html',
  styleUrls: ['./image-generate-preview.component.scss']
})
export class ImageGeneratePreviewComponent {
  @ViewChild('imagePreview')
  imagePreview!: Image;

  prompt: string = "";
  previewImageSrc = "https://wallpapertops.com/walldb/original/d/b/a/707646.jpg";
  generatedId: string = "";
  uploadStatus: string = "";
  uploadLogs: string[] = [];

  stopPolling$: Subject<void> = new Subject();

  constructor(private generateImageService: GenerateImageService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef){}

  generateImage(){
    this.generateImageService.generateImageFromPrompt(this.prompt).subscribe(res => {
      console.log(res);
      // this.previewImageSrc = res.output[0];
      // this.generatedId = res.id;
      timer(1000).subscribe(() => this.startPollingStatus())
    });
  }


  private processStatus(res: PredictionStatus){
    console.log(res);
    if(res?.status){
      this.uploadStatus = res.status;
      this.uploadLogs = res.logs?.split('\n') ?? []

      if(res.output[0]){
        this.previewImageSrc = res.output[0]
        this.cdRef.detectChanges();
        this.stopPolling$.next();
      }
    }

    if(res?.error){
      this.messageService.add({severity: "error", summary: "Generation Error", sticky: true, detail: res?.error});
    }
  }

  private startPollingStatus(): void {
    let time = 0
    interval(1000).pipe(
      switchMap(() => this.generateImageService.getStatus(this.generatedId)),
      takeUntil(this.stopPolling$),
    ).subscribe(res => {
      this.processStatus(res);
      if(time >= 5){
        this.stopPolling$.next();
      }
      time++;
    });
  }

  checkStatus(){
    if(this.generatedId){

    this.generateImageService.getStatus(this.generatedId).subscribe(res => {
      this.processStatus(res)
    });

    } else {
      this.messageService.add({severity: "error", summary: "No Image Generated", detail: "Generate an image first."});
    }
  }
}
