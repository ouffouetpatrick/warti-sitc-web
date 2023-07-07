import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PermissionComponent } from './permission.component';
import {MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { pipe } from 'rxjs';
import { PermissionFormComponent } from './permissionForm/permissionForm.component';
// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { 
    NgxMatDatetimePickerModule, 
    NgxMatTimepickerModule, 
    NgxMatNativeDateModule
 } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { QuillModule } from 'ngx-quill';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RejeterFormComponent } from './rejeterForm/rejeterForm.component';
// import { FuseFindByKeyPipeModule } from '@fuse/pipe/find-by-key';

const permissionRoutes: Route[] = [
    {
        path     : '',
        component: PermissionComponent
    }
];

@NgModule({
    declarations: [
        PermissionComponent,
        PermissionFormComponent,
        RejeterFormComponent
    ],
    imports     : [
        RouterModule.forChild(permissionRoutes),
        MatTableModule,
        MatTabsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatTimepickerModule,
        MatDatepickerModule,
        MatSelectModule,
        MatDialogModule,
        SharedModule, 
        MatMomentDateModule, 
        MatSnackBarModule,
    ]
})
export class PermissionModule
{
}
