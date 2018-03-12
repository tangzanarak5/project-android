import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { securityService } from "../../../../security/security.service";
import { standard } from "../../../../security/model/standard.model"
@Component({
    selector: "my-modal",
    templateUrl: "showStandard.component.html",
    styleUrls: ['showStandard.component.css'],
    moduleId: module.id
})
export class showStandardComponent {
    dataUser ;
    standard: standard ;
    public frameworks: Array<string>;
    dataStandard = [
        {
            dataText: "   - ปกติ 70 -100 mg/dL\n   - สูงกว่าปกติ 100-125 mg/dL\n   - สูงมาก 126 mg/dL\n"
        },
        {
            dataText: "   - ปกติ น้อยกว่า 5.7 mg%\n   - สูงกว่าปกติ 5.7 - 6.4 mg%\n   - สูงมาก 6.5 mg%\n"
        },
        {
            dataText: "   - น้อยกว่าปกติ 0-30 mg/dL\n   - ปกติ 40-60 mg/dL\n   - สูงมาก 60 mg/dL ขึ้นไป\n"
        },
        {
            dataText: "   - ปกติ น้อยกว่า 100 mg/dL\n   - สูงกว่าปกติ 100 – 129 mg/dL\n   - สูงมาก 130-190 mg/dL\n"
        },
        {
            dataText: "   - ปกติ 90 - 119 / 60 - 79 มม.ปรอท\n   - สูงกว่าปกติ 120 - 179 / 80 - 109 มม.ปรอท\n   - สูงมาก 180 / 110 มม.ปรอท ขึ้นไป\n"
        },
        {
            dataText: "   - ปกติ 60 - 100 ครั้งต่อนาที\n   - สูงกว่าปกติ 101 - 139 ครั้งต่อนาที\n   - สูงมาก 140 ครั้งต่อนาที ขึ้นไป\n"
        }
    ] ;
    i ;
    public constructor(private params: ModalDialogParams) {   
    }
    configure(datePicker: DatePicker) {
    }
    ngOnInit(){
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.standard = JSON.parse(securityService.getStandard);
        console.log(securityService.getStandard);

        if (this.standard.name == "ระดับน้ำตาลในเลือด") {
            this.i = 0 ;
        }
        else if (this.standard.name == "ระดับน้ำตาลเฉลี่ยในเลือด") {
            this.i = 1 ;
        }
        else if (this.standard.name == "คอเลสเตอรอลที่ดี") {
            this.i = 2 ;
        }
        else if (this.standard.name == "ไขมันไม่ดี") {
            this.i = 3 ;
        }
        else if (this.standard.name == "ความดันโลหิต") {
            this.i = 4 ;
        }
        else if (this.standard.name == "ชีพจร") {
            this.i = 5 ;
        }
    }
    public close(res: Date) {
        this.params.closeCallback(res);
    }

}