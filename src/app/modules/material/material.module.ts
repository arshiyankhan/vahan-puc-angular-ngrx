import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';

const mat = [
  CommonModule,
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatStepperModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...mat
  ],
  exports: [
    CommonModule,
    ...mat
  ]
})
export class MaterialModule { }
