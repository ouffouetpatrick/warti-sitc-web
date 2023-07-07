import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TypepermissionComponent } from './typepermission.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TypepermissionFromComponent } from './typepermissionFrom/typepermissionFrom.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const typepermissionRoutes: Route[] = [
    {
        path     : 'typepermission',
        component: TypepermissionComponent
    }
];

@NgModule({
    declarations: [
        TypepermissionComponent,
        TypepermissionFromComponent
    ],
    imports     : [
        RouterModule.forChild(typepermissionRoutes),
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
export class TypepermissionModule
{
}
