import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { securityService } from "../../../../security/security.service";
import { selectBlood } from "../../../../security/model/selectBlood.model"
@Component({
    selector: "my-modal",
    templateUrl: "showStandard.component.html",
    styleUrls: ['showStandard.component.css'],
    moduleId: module.id
})
export class showStandardComponent {
    dataUser ;
    selectBlood: selectBlood ;
    standardName;
    public frameworks: Array<string>;
    dataStandard = [
        {
            dataText: "   - ปกติ น้อยกว่า 5.7 mg%\n   - สูงกว่าปกติ 5.7 - 6.4 mg%\n   - สูงมาก 6.5 mg%\n"
        },
        {
            dataText: "    - ปกติ 70-100 mg/dL\n    - สูงกว่าปกติ 100-125mg/dL\n    - สูงมาก 126 mg/dL\n"
        },
        {
            dataText: "   - น้อยกว่าปกติ 0-30 mg/dL\n   - ปกติ 40-60 mg/dL\n   - สูงมาก 60 mg/dL ขึ้นไป\n"
        },
        {
            dataText: "   - ปกติ น้อยกว่า 100 mg/dL\n   - สูงกว่าปกติ 100 – 129 mg/dL\n   - สูงมาก 130-190 mg/dL\n"
        },
        {
            dataText: "   - ปกติ น้อยกว่า  150 mg/dL\n   - สูงกว่าปกติ 150 - 199 mg/dL\n   - สูง 200 - 499 mg/dL\n   - สูงมาก 500 mg/dL ขึ้นไป"
        },
        {
            dataText: "   - ปกติ 5 - 20 mg/dL\n   - น้อยกว่าปกติ 0 - 4 mg/dl\n   - สูงกว่าปกติ 20 mg/dl ขึ้นไป"
        },
        {
            dataText: "   - ปกติ น้อยกว่า 200 mg/dL\n   - มากกว่ากว่าปกติ 200 - 240 mg/dl\n   - สูงกว่าปกติ 240 mg/dl ขึ้นไป"
        },
        {
            dataText: "   - ปกติ 0.7 - 1.3 mg/dL\n   - น้อยกว่าปกติ 0 - 0.6 mg/dl\n   - สูงกว่าปกติ 1.3 mg/dl ขึ้นไป"
        }
        // {
        //     dataText: "    ชาย\n    - น้อยกว่าปกติ น้อยกว่า 4.2 /µL\n     - ปกติ 4.2-5.4 /µL\n    - สูงกว่าปกติ มากกว่า 5.4 /µL\n     หญิง\n     - น้อยกว่าปกติ น้อยกว่า 3.6 /µL\n     - ปกติ 3.6-5.0 /µL\n    - สูงกว่าปกติ มากกว่า 5.0 /µL\n"
        // },
        // {
        //     dataText: "   - น้อยกว่าปกติ 0.3 mg/dL\n   - ปกติ 0.3 – 1.0 mg/dL\n   - สูงมาก 1.0 mg/dL ขึ้นไป\n"
        // },
        // {
        //     dataText: "   ชาย\n    - น้อยกว่าปกติ 14 g/dl\n   - ปกติ 14 – 18 g/dl\n   - สูงมาก 18 g/dl ขึ้นไป\n     หญิง\n    - น้อยกว่าปกติ 12 g/dl\n   - ปกติ 12 – 16 g/dl\n   - สูงมาก 16 g/dl ขึ้นไป\n"
        // },
        // {
        //     dataText: "   ชาย\n   - น้อยกว่าปกติ 42%\n   - ปกติ 42–52 %\n   - สูงมาก 52 % ขึ้นไป\n     หญิง\n   - น้อยกว่าปกติ 36 % \n   - ปกติ 36–48 %\n   - สูงมาก 48% ขึ้นไป\n"
        // },
        // {
        //     dataText: "   - น้อยกว่าปกติ น้อยกว่า 78 fl\n     - ปกติ 78 - 98 fl\n   - สูงกว่าปกติ มากกว่า 98 fl\n"
        // },
        // {
        //     dataText: "   - น้อยกว่าปกติ น้อยกว่า 0.3 EU/dL\n    - ปกติ 0.3-1.0 EU/dL\n   - สูงกว่าปกติ มากกว่า 1.0 EU/dL\n"
        // },
        // {
        //     dataText: "   - น้อยกว่าปกติ น้อยกว่า 4.6 pH\n    - ปกติ 4.6 - 8.0 pH\n   - สูงกว่าปกติ มากกว่า 8.0 pH\n"
        // },
        // {
        //     dataText: "   - น้อยกว่าปกติ น้อยกว่า 6.4 gm/dL\n   - ปกติ 6.4 – 8.3 gm/dL\n   - สูงกว่าปกติ มากกว่า 8.3 gm/dL\n"
        // },
        // {
        //     dataText: "   - น้อยกว่าปกติ น้อยกว่า 3 mg\n     - ปกติ 3-15 mg\n   - สูงกว่าปกติ มากกว่า 15 mg\n"
        // }
    ] ;
    i ;
    public constructor(private params: ModalDialogParams) {   
    }
    configure(datePicker: DatePicker) {
    }
    ngOnInit(){
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.selectBlood = JSON.parse(securityService.getSelectBlood);
        console.log(securityService.getSelectBlood) ;
        this.i = 0
        this.standardName = this.selectBlood.name

        if(this.selectBlood.numberIndex == "HbA1C"){
            this.i = 0;
        }
        else if(this.selectBlood.numberIndex == "Glucose"){
            this.i = 1;
        }
        else if(this.selectBlood.numberIndex == "HDL"){
            this.i = 2;
        }
        else if(this.selectBlood.numberIndex == "LDL"){
            this.i = 3;
        }
        else if(this.selectBlood.numberIndex == "Triglycerides"){
            this.i = 4;
        }
        else if(this.selectBlood.numberIndex == "BUN"){
            this.i = 5;
        }
        else if(this.selectBlood.numberIndex == "Cholesterol"){
            this.i = 6;
        }
        else if(this.selectBlood.numberIndex == "Creatinine"){
            this.i = 7;
        }
        // else if(this.selectBlood.numberIndex == "RBC"){
        //     this.i = 5;
        // }
        // else if(this.selectBlood.numberIndex == "Bilirubin"){
        //     this.i = 6;
        // }
        // else if(this.selectBlood.numberIndex == "Hb"){
        //     this.i = 7;
        // }
        // else if(this.selectBlood.numberIndex == "Hct"){
        //     this.i = 8;
        // }
        // else if(this.selectBlood.numberIndex == "MCV"){
        //     this.i = 9;
        // }
        // else if(this.selectBlood.numberIndex == "Urobilinogen"){
        //     this.i = 10;
        // }
        // else if(this.selectBlood.numberIndex == "pH"){
        //     this.i = 11;
        // }
        // else if(this.selectBlood.numberIndex == "Protein"){
        //     this.i = 12;
        // }
        // else if(this.selectBlood.numberIndex == "Ketone"){
        //     this.i = 13;
        // }
    }
    public close(res: Date) {
        this.params.closeCallback(res);
    }

}