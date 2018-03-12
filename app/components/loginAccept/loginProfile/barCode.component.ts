import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { securityService } from "../../security/security.service";
@Component({
    selector: "my-modal",
    templateUrl: "barCode.component.html",
    styleUrls: ['barCode.component.css'],
    moduleId: module.id
})
export class barCodeComponent {
   barcode;
   dataUser ;
   hospitalnumber;
    public frameworks: Array<string>;

    public constructor(private params: ModalDialogParams) {
    }

    public date:Date;
    public toDay:Date;
    configure(datePicker: DatePicker) {
    }
    ngOnInit(){
        this.dataUser = JSON.parse(securityService.getDataUser);
        this.hospitalnumber = this.dataUser.dataset.hn
        this.barcode = "https://barcode.tec-it.com/barcode.ashx?translate-esc=off&data=" + this.hospitalnumber + "&code=Code39&multiplebarcodes=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0" ;
    }

    public close(res: Date) {
        this.params.closeCallback(res);
    }

}