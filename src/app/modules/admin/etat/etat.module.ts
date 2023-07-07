import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { EtatComponent } from 'app/modules/admin/etat/etat.component';

const etatRoutes: Route[] = [
    {
        path     : '',
        component: EtatComponent
    }
];

@NgModule({
    declarations: [
        EtatComponent
    ],
    imports     : [
        RouterModule.forChild(etatRoutes),
        MatTableModule,
        MatTabsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
       
    ]
})
export class EtatModule
{
}
