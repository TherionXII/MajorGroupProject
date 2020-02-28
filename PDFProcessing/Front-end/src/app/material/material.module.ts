import { NgModule } from '@angular/core';
import {MatCheckboxModule, MatFormFieldModule, MatListModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';


@NgModule({
    imports: [
        MatCheckboxModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        MatCheckboxModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule { }
