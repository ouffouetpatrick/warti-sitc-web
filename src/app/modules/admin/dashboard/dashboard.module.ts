import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';
import { DashboardComponent } from 'app/modules/admin/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';


const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports     : [
        RouterModule.forChild(dashboardRoutes),
        MatButtonModule,
        // MatButtonToggleModule,
        MatTableModule,
        MatTabsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        GoogleChartsModule,
        NgApexchartsModule,
        MatListModule,
        MatSelectModule,
        MatMenuModule,
        MatInputModule,
    ]
})
export class DashboardModule
{
}
