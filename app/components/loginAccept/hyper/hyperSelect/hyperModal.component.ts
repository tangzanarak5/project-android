import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { securityService } from "../../../security/security.service";
import { hyperSelectOne } from "../../../security/model/hyperSelectOne.model"
@Component({
    selector: "my-modal",
    templateUrl: "hyperModal.component.html",
    styleUrls: ['hyperModal.component.css'],
    moduleId: module.id
})
export class hyperModalComponent {
    dataUser ;
    hyperSelectOne: hyperSelectOne ;
    dataHyper = [
        {
            name: "ดัชนีมวลกาย",
            dataText: "   - อ้วนมาก ( 30.0 ขึ้นไป )\n   - อ้วน ( 25.0 - 29.9 )\n   - น้ำหนักเกิน ( 23.0 - 24.9 )\n   - น้ำหนักปกติ เหมาะสม ( 18.6 - 22.9 )\n   - ผอมเกินไป ( น้อยกว่า 18.5 )\n"
        },
        {
            name: "ความดันโลหิต",
            dataText: "   - ปกติ 90 - 119 / 60 - 79 มม.ปรอท\n   - สูงกว่าปกติ 120 - 179 / 80 - 109 มม.ปรอท\n   - สูงมาก 180 / 110 มม.ปรอท ขึ้นไป\n"
        },
        {
            name: "ชีพจร",
            dataText: "   - ปกติ 60 - 100 ครั้งต่อนาที\n   - สูงกว่าปกติ 101 - 139 ครั้งต่อนาที\n   - สูงมาก 140 ครั้งต่อนาที ขึ้นไป\n"
        }
    ];
    public frameworks: Array<string>;
    i ;
    public constructor(private params: ModalDialogParams) {   
    }
    configure(datePicker: DatePicker) {
    }
    ngOnInit(){
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hyperSelectOne = JSON.parse(securityService.getHyperSelectOne);
        console.log(securityService.getHyperSelectOne);

        if (this.hyperSelectOne.nameIndex == "0") {
            this.i = 0 ;
        }
        else if (this.hyperSelectOne.nameIndex == "1") {
            this.i = 1 ;
        }
        else if (this.hyperSelectOne.nameIndex == "2") {
            this.i = 2 ;
        }
    }
    public close(res: Date) {
        this.params.closeCallback(res);
    }

}