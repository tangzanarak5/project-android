import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { SecurityModule } from "./components/security/security.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { loginAcceptModule } from "./components/loginAccept/loginAccept.module";
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';
import {CarouselDirective} from "nativescript-ng2-carousel/nativescript-ng2-carousel";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        SecurityModule,
        loginAcceptModule,
        NativeScriptFormsModule,
        HttpModule,
        NativeScriptHttpModule,
        TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css'
          })
    ],
    declarations: [
        AppComponent,
        CarouselDirective
    ],
    providers: [
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AppModule { }
