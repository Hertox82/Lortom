import {Component, OnInit,Input} from "@angular/core";
import {User} from "./user.interface";
import {EventService} from "../../../../services/event.service";

@Component({
    selector : 'app-user-model',
    templateUrl : './usermodel.component.html',
    styles : ['']
})

export class UserModelComponent implements OnInit{

    isEdit : boolean;
    @Input() user : User;

    constructor(private eService : EventService){
        this.isEdit = false;
        this.user = {
            id : 1,
            name : 'Hernan Ariel De Luca',
            email : 'hadeluca@gmail.com',
            password : '',
        };
    }

    ngOnInit(){
        this.eService.clicked({
            object : this,
            close: false,
            active : false,
        });
    }

    editMode()
    {
        this.isEdit = !this.isEdit;
    }
}