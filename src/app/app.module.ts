import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextarea, InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {TimelineModule} from 'primeng/timeline';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DataViewModule} from 'primeng/dataview';
import {ToolbarModule} from 'primeng/toolbar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageGeneratePreviewComponent } from './image-generate-preview/image-generate-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PredictionsListComponent } from './predictions-list/predictions-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageGeneratePreviewComponent,
    PredictionsListComponent,
    ToolbarComponent
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
    ProgressBarModule,
    DataViewModule,
    ToolbarModule,
  ],
  providers: [MessageService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextarea),
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
