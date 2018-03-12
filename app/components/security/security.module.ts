import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { SecurityComponent } from "./security.component";
import { SecurityRouting } from "./security.routing";
import { StandByToLoginComponent } from "./standbytologin/standbytologin.component";
import { VerifyHnComponent } from "./verifyHn/verifyHn.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { verifyidcardComponent } from "./verifyidcard/verifyidcard.component";
import { registerAccountComponent } from "./registerAccount/registerAccount.component";
import { verifyidcardService } from "../security/verifyidcard/verifyidcard.service";
import { formProfileRecordComponent } from "./formProfileRecord/formProfileRecord.component";
import { formAddressRecordComponent } from "./formAddressRecord/formAddressRecord.component";
import { verifyHnService } from "../security/verifyHn/verifyHn.service";
import { formRelativeAndMedicalAndSymptomRecordComponent } from "./formRelativeAndMedicalAndSymptomRecord/formRelativeAndMedicalAndSymptomRecord.component";
import { formPicAndAcceptComponent } from "./formPicAndAccept/formPicAndAccept.component";
import { registerAccountService } from "../security/registerAccount/registerAccount.service";
import { formDateComponent } from "../security/formProfileRecord/formDate.component";
import { securityService } from "../security/security.service";
import { registerPasswordComponent } from "../security/registerPassword/registerPassword.component";
import { subMitFormComponent } from "./subMitform/subMitForm.component";
import { formPicAndAcceptService } from "./formPicAndAccept/formPicAndAccept.service";
import { standbytologinService } from "./standbytologin/standbytologin.service";
import { AuthGuard } from "../security/auth-guard.service";
import { newPatientComponent } from "./newPatient/newPatient.component";
import { registerSuccessComponent } from "../security/registerSuccess/registerSuccess.component";
import {AndroidApplication} from "application";
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';

@NgModule({
    imports: [
        NativeScriptModule,
        SecurityRouting,
        NativeScriptFormsModule,
        TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css'
          })
    ],
    declarations: [
        SecurityComponent,
        StandByToLoginComponent,
        VerifyHnComponent,
        registerAccountComponent,
        verifyidcardComponent,
        formProfileRecordComponent,
        formAddressRecordComponent,
        formRelativeAndMedicalAndSymptomRecordComponent,
        formPicAndAcceptComponent,
        formDateComponent,
        registerPasswordComponent,
        subMitFormComponent,
        registerSuccessComponent,
        newPatientComponent
        
    ],
    providers: [
        verifyidcardService,
        verifyHnService,
        registerAccountService,
        securityService,
        formPicAndAcceptService, 
        standbytologinService,
        AuthGuard,
        AndroidApplication
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class SecurityModule { }
