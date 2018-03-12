import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import { securityService } from "../security.service";
import { connectionType, getConnectionType } from "connectivity";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
    selector: "newPatient",
    templateUrl: "newPatient.component.html",
    styleUrls: ['newPatient.component.css'],
    moduleId: module.id
})

export class newPatientComponent implements OnInit {

    ngOnInit(): void {}
    constructor(page: Page, private fonticon: TNSFontIconService) {}

 }