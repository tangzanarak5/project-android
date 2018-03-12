import { NgModule, NO_ERRORS_SCHEMA, ViewContainerRef } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { LoginAcceptRouting } from "../loginAccept/loginAccept.routing";
import { loginAcceptComponent } from "../loginAccept/loginAccept.component";
import { loginProfileComponent } from "../loginAccept/loginProfile/loginProfile.component";
import { loginProfileService } from "../loginAccept/loginProfile/loginProfile.service";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { sideBarComponent } from "../loginAccept/loginProfile/sideBar/sideBar.component";
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';
import { profileUserComponent } from "../loginAccept/profileUser/profileUser.component";
import { bloodResultComponent } from "../loginAccept/bloodResult/bloodResult.component";
import { costComponent } from "../loginAccept/cost/cost.component";
import { medicineComponent } from "../loginAccept/medicine/medicine.component";
import { appointmentComponent } from "../loginAccept/appointment/appointment.component";
import { barCodeComponent } from "../loginAccept/loginProfile/barCode.component";
import { bloodResultSelectComponent } from "./bloodResult/bloodResultSelect/bloodResultSelect.component";
import { bloodResultSelectTotalComponent } from "./bloodResult/bloodResultSelectTotal/bloodResultSelectTotal.component";
import { showInfoComponent } from "./bloodResult/bloodResultSelect/showInfo/showInfo.component";
import { showStandardComponent } from "./bloodResult/bloodResultSelectTotal/showStandard/showStandard.component";
import { medicineSelectComponent } from "./medicine/medicineSelect/medicineSelect.component";
import { medicineSelectOneComponent } from "./medicine/medicineSelectOne/medicineSelectOne.component";
import { selectCostComponent } from "./cost/selectCost/selectCost.component";
import { bloodChartComponent } from "./bloodResult/bloodChart/bloodChart.component";

@NgModule({

    imports: [
        NativeScriptModule,
        LoginAcceptRouting,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css'
          })
    ],
    declarations: [
        loginProfileComponent,
        loginAcceptComponent,
        sideBarComponent,
        profileUserComponent,
        bloodResultComponent,
        costComponent,
        selectCostComponent,
        medicineComponent,
        appointmentComponent,
        barCodeComponent,
        showInfoComponent,
        showStandardComponent,
        bloodResultSelectComponent,
        bloodResultSelectTotalComponent,
        medicineSelectComponent,
        medicineSelectOneComponent,
        bloodChartComponent
    ],
    providers: [
        ModalDialogService,
        loginProfileService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class loginAcceptModule { }
