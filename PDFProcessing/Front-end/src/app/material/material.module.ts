import { NgModule } from '@angular/core';
import {
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule
} from '@angular/material';


@NgModule({
    imports: [
        MatCheckboxModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatButtonModule
    ],
    exports: [
        MatCheckboxModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatButtonModule
    ]
})
export class MaterialModule { }
