import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaperProcessingComponent} from './PartialComponents/paper-processing/paper-processing.component';
import {PaperCreationComponent} from './PartialComponents/paper-creation/paper-creation.component';
import {PaperManagementComponent} from './ExportComponents/paper-management/paper-management.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { PaperUploadComponent } from './PartialComponents/paper-upload/paper-upload.component';
import {RouterModule} from '@angular/router';
import { PaperComponent } from './ExportComponents/paper/paper.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PaperManagementComponent,
    PaperProcessingComponent,
    PaperCreationComponent,
    PaperUploadComponent,
    PaperComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MaterialFileInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ImageCropperModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports: [
    PaperManagementComponent,
    PaperComponent
  ]
})
export class PaperModule { }
