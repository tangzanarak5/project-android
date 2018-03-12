import { NgModule, ModuleWithProviders } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes, RouterModule } from "@angular/router";
import { loginProfileComponent } from "./loginProfile/loginProfile.component";
import { AuthGuard } from "../security/auth-guard.service";
import { loginAcceptComponent } from "../loginAccept/loginAccept.component";
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

const routes: Routes = [
    { path: "loginAccept", 
    component: loginAcceptComponent,
    canActivate: [AuthGuard]
    },
    {
        path: 'loginProfile',
        component: loginProfileComponent
    },
    {
        path: 'profileUser',
        component: profileUserComponent
    },
    {
        path: 'bloodResult',
        component: bloodResultComponent
    },
    {
        path: 'cost',
        component: costComponent
    },
    {
        path: 'selectCost',
        component: selectCostComponent
    },
    {
        path: 'medicine',
        component: medicineComponent
    },
    {
        path: 'appointment',
        component: appointmentComponent
    },
    {
        path: 'barCode',
        component: barCodeComponent
    },
    {
        path: 'showInfo',
        component: showInfoComponent
    },
    {
        path: 'showStandard',
        component: showStandardComponent
    },
    {
        path: 'bloodResultSelect',
        component: bloodResultSelectComponent
    },
    {
        path: 'bloodResultSelectTotal',
        component: bloodResultSelectTotalComponent
    },
    {
        path: 'medicineSelect',
        component: medicineSelectComponent
    }
    ,
    {
        path: 'medicineSelectOne',
        component: medicineSelectOneComponent
    },
    {
        path: 'bloodChart',
        component: bloodChartComponent
    }


];

export const LoginAcceptRouting: ModuleWithProviders = RouterModule.forChild(routes);