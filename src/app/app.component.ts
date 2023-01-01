import { GenerateImageService } from './services/generate-image.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aishop-frontend';

  constructor(private generateImageService: GenerateImageService){}


}
