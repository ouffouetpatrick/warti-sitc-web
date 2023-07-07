import { NgModule } from "@angular/core";
import { QrcodeModule } from "./qrcode/qrcode.module";
import { MotifModule } from "./motif/motif.module";
import { TypepermissionModule } from "./typepermission/typepermission.module";


@NgModule({
    declarations: [],
    imports: [
        QrcodeModule,
        MotifModule,
        TypepermissionModule,
    ]
  })
export class ParametreModule
{}
