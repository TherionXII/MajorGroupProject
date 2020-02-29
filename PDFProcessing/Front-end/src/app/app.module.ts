import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule, MatIconModule, MatTabsModule, MatCardModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
        FileUploadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ImageCropperModule,
        BrowserAnimationsModule,
        MaterialFileInputModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatTabsModule,
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
