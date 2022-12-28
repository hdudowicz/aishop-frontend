import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GenerateImageService } from '../generate-image.service';

@Component({
  selector: 'app-image-generate-preview',
  templateUrl: './image-generate-preview.component.html',
  styleUrls: ['./image-generate-preview.component.scss']
})
export class ImageGeneratePreviewComponent {
  prompt: string = "";
  previewImageSrc = "https://cdn.paperhi.com/1680x1050/20140222/artwork%20zdzislaw%20beksinski%20surreal%20art_www.paperhi.com_75.jpg";
  generatedId: string = "";
  uploadStatus: string = "";
  uploadLogs: string[] = [];
  optId: string = "";

  constructor(private generateImageService: GenerateImageService,
    private messageService: MessageService){}

  generateImage(){
    this.generateImageService.generateImageFromPrompt(this.prompt).subscribe(res => {
      console.log(res);
      // this.previewImageSrc = res.output[0];
      // this.generatedId = res.id;
    });
  }

  checkStatus(){
    if(this.optId || this.generatedId){
      this.generateImageService.getStatus(this.optId.length > 0 ? this.optId : this.generatedId).subscribe(res => {
        console.log(res);
        if(res?.output && res.output[0]){
          this.previewImageSrc = res.output[0]
          this.uploadStatus = res.status;
          this.uploadLogs = res.logs.split('\n')
        }

        if(res?.error){
          this.messageService.add({severity: "error", summary: "Generation Error", sticky: true, detail: res?.error});
        }
      })
    } else {
      this.messageService.add({severity: "error", summary: "No Image Generated", detail: "Generate an image first."});
    }
  }
}
