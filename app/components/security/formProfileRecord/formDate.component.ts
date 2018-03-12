import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { user } from "../model/user.model"
import { DatePicker } from "ui/date-picker";

@Component({
    selector: "my-modal",
    templateUrl: "formDate.component.html",
    styleUrls: ['formProfileRecord.component.css'],
    moduleId: module.id
})
export class formDateComponent {

    public frameworks: Array<string>;

    public constructor(private params: ModalDialogParams) {
        this.frameworks = [
            "NativeScript",
            "Xamarin",
            "Onsen UI",
            "Ionic Framework",
            "React Native"
        ];
    }

    public date:Date;
    public toDay:Date;
    configure(datePicker: DatePicker) {
    }
    ngOnInit(){
        this.date = new Date();
        this.toDay = new Date();
    }
    onTap(args){
        console.log("print new date");
        console.log(this.date);
        this.close(this.date);
    }
    onDateChanged(args) {
        console.log("Date changed");
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
        this.date = args.value;
        
    }
    onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;
        datePicker.day = this.toDay.getDate();
        datePicker.year = this.toDay.getFullYear();
        datePicker.month = this.toDay.getMonth() + 1;
        datePicker.minDate = new Date(1925, 0, 29);
        datePicker.maxDate = new Date();
    }

    public close(res: Date) {
        this.params.closeCallback(res);
    }

}