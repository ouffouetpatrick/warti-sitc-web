import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
// import { AgmCoreModule } from '@agm/core';

const mapRoutes: Route[] = [
    {
        path     : '',
        component: MapComponent
    }
];

@NgModule({
    declarations: [
        MapComponent
    ],
    imports     : [
        RouterModule.forChild(mapRoutes),
        // AgmCoreModule.forRoot({
        //     apiKey: 'GOOGLE API KEY',
        //     libraries: ['places']
        //   }),
        // AgmCoreModule,
    ]
})
export class MapModule
{
}
