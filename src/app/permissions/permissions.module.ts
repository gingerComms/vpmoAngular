import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatCardModule,
  MatListModule, MatTableModule, MatDialogModule, MatSelectModule, MatTooltipModule,
  MatAutocompleteModule } from '@angular/material';
import { UserModule } from '../user/user.module';

import { AuthGuard } from '../_guards/auth.guard';
import { PermissionsComponent } from './permissions.component';
import { AddPermissionsComponent } from './add-permissions.component';
import { PermissionsService } from './permissions.service';


const PermissionsRoutes: Routes = [
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [ AuthGuard ]
  }
];
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PermissionsRoutes),
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    UserModule
  ],
  declarations: [
    PermissionsComponent,
    AddPermissionsComponent
  ],
  providers: [
    PermissionsService
  ],
  exports: [
    PermissionsComponent,
    AddPermissionsComponent
  ],
  bootstrap: [PermissionsComponent],
  entryComponents: [AddPermissionsComponent]
})
export class PermissionsModule { }