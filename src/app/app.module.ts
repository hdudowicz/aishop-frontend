import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {TimelineModule} from 'primeng/timeline';
import {InputTextModule} from 'primeng/inputtext';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageGeneratePreviewComponent } from './image-generate-preview/image-generate-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ImageGeneratePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    FormsModule,
    ImageModule,
    ButtonModule,
    ToastModule,
    TimelineModule,
    InputTextModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
