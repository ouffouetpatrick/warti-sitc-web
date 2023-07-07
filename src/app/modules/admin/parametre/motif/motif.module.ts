import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MotifComponent } from './motif.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
// import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'app/shared/shared.module';
import { MotifFormComponent } from './motifForm/motifForm.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';


const motifRoutes: Route[] = [
    {
        path     : 'motif',
        component: MotifComponent
    }
];

@NgModule({
    declarations: [
        MotifComponent,
        MotifFormComponent
    ],
    imports     : [
        RouterModule.forChild(motifRoutes),
        MatTableModule,
        MatTabsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDialogModule,
        SharedModule, 
        MatSnackBarModule,
      
    ]
})
export class MotifModule
{
}
