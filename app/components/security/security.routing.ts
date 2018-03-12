import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes, RouterModule } from "@angular/router";
import { SecurityComponent } from "./security.component";
import { StandByToLoginComponent } from "./standbytologin/standbytologin.component";
import { VerifyHnComponent } from "./verifyHn/verifyHn.component";
import { registerAccountComponent } from "./registerAccount/registerAccount.component";
import { verifyidcardComponent } from "./verifyidcard/verifyidcard.component";
import { formProfileRecordComponent } from "./formProfileRecord/formProfileRecord.component";
import { formAddressRecordComponent } from "./formAddressRecord/formAddressRecord.component";
import { formRelativeAndMedicalAndSymptomRecordComponent } from "./formRelativeAndMedicalAndSymptomRecord/formRelativeAndMedicalAndSymptomRecord.component";
import { formPicAndAcceptComponent } from "./formPicAndAccept/formPicAndAccept.component";
import { formDateComponent } from "./formProfileRecord/formDate.component";
import { registerPasswordComponent } from "./registerPassword/registerPassword.component";
import { subMitFormComponent } from "./subMitform/subMitForm.component";
import { AuthGuard } from "./auth-guard.service";
import { newPatientComponent } from "./newPatient/newPatient.component";
import { registerSuccessComponent } from "../security/registerSuccess/registerSuccess.component";

const routes: Routes = [
   
    { 
        path: "security", 
        component: SecurityComponent, 
        children: [
           
            {
                path: 'standbytologin',
                component: StandByToLoginComponent
            },
            {
                path: 'verifyHn',
                component: VerifyHnComponent
            },
            {
                path: 'registerAccount',
                component: registerAccountComponent
            },
            {
                path: 'verifyidcard',
                component: verifyidcardComponent
            },
            {
                path: 'formProfileRecord',
                component: formProfileRecordComponent
            },
            {
                path: 'formAddressRecord',
                component: formAddressRecordComponent
            },
            {
                path: 'formRelativeAndMedicalAndSymptomRecord',
                component: formRelativeAndMedicalAndSymptomRecordComponent
            },
            {
                path: 'formPicAndAccept',
                component: formPicAndAcceptComponent
            },
            {
                path: 'formDate',
                component: formDateComponent
            },
            {
                path: 'registerPassword',
                component: registerPasswordComponent
            },
            {
                path: 'subMitForm',
                component: subMitFormComponent
            },
            {
                path: 'newPatient',
                component: newPatientComponent
            },
            {
                path: 'registerSuccess',
                component: registerSuccessComponent
            }
            
        ]
    }
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class SecurityRouting { }