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
import { appointmentService } from "./appointment/appointment.service";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { bloodChartService } from "./bloodResult/bloodChart/bloodChart.service";
import { medicineService } from "../loginAccept/medicine/medicine.service";
import { hyperComponent } from "../loginAccept/hyper/hyper.component";
import { hyperSelectService } from "./hyper/hyperSelect/hyperSelect.service";
import { hyperSelectComponent } from "./hyper/hyperSelect/hyperSelect.component";
import { hyperChartComponent } from "./hyper/hyperSelect/hyperChart/hyperChart.component";
import { hyperChartService } from "./hyper/hyperSelect/hyperChart/hyperChart.service";
import { hyperModalComponent } from "./hyper/hyperSelect/hyperModal.component";
import { costService } from "./cost/cost.service";
import { bloodResultService } from "./bloodResult/bloodResult.service";
import { NativeScriptUICalendarModule } from "nativescript-pro-ui/calendar/angular";

@NgModule({

    imports: [
        NativeScriptModule,
        LoginAcceptRouting,
        NativeScriptFormsModule,
        NativeScriptUIChartModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUICalendarModule,
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
        bloodChartComponent,
        hyperComponent,
        hyperChartComponent,
        hyperSelectComponent,
        hyperModalComponent
    ],
    providers: [
        ModalDialogService,
        loginProfileService,
        appointmentService,
        bloodChartService,
        medicineService,
        hyperSelectService,
        hyperChartService,
        costService,
        bloodResultService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class loginAcceptModule { }
