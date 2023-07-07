import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { QRCodeModule } from 'angular2-qrcode';
import { SharedModule } from 'app/shared/shared.module';
import { QrcodeComponent } from './qrcode.component';

const qrcodeRoutes: Route[] = [
    {
        path     : 'qrcode',
        component: QrcodeComponent
    }
];

@NgModule({
    declarations: [
        QrcodeComponent,
    ],
    imports     : [
        RouterModule.forChild(qrcodeRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        MatTabsModule,
        QRCodeModule,
        FormsModule,
    ]
})
export class QrcodeModule{}
