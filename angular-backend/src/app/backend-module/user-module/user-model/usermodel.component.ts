import {Component, OnInit, Input} from '@angular/core';
import {User} from './user.interface';
import {EventService} from '../../../../services/event.service';
import {MenuService} from '../../../menuservice';
import {Permission} from './user.interface';
import { AuthService } from '@Lortom/app/auth-module/auth.service';

@Component({
    selector : 'app-user-model',
    templateUrl : './usermodel.component.html',
    styles : ['']
})
export class UserModelComponent implements OnInit {

    isEdit: boolean;
    @Input() user: User;
    confirm:  string;

    copyUser: User;

    constructor (private eService: EventService, private authService: AuthService, private mService: MenuService) {
        this.isEdit = false;
        this.user = this.authService._currentUser;
        this.copyUser = Object.assign({}, this.user);
    }

    ngOnInit() {
        this.eService.clicked({
            object : this,
            close: false,
            active : false,
        });
    }

    editMode() {
        this.isEdit = !this.isEdit;
    }

    saveMode() {

        if ('password' in this.user) {
            if (this.user.password.length > 0) {
                if (this.user.password === this.confirm) {
                    if (this.user.name === this.copyUser.name) {
                        delete this.user.name;
                    }
                    this.sendUserData();
                } else {
                    alert('La nuova password non è stata confermata, ridigita');
                }
            } else {
                this.sendUserData();
            }
        } else {
            if (this.user.name !== this.copyUser.name) {
                this.sendUserData();
            } else {
                alert('You don\'t change anything');
            }
        }
    }

    resetMode() {
        this.user = Object.assign({}, this.copyUser);
    }

    private sendUserData() {
        this.mService.editMyProfile(this.user).subscribe(
            (response: {message: string, user: {name: string, username: string, permissions: Permission[]}}) => {
                this.user = {name : response.user.name, permissions: response.user.permissions};
                this.copyUser = Object.assign({}, this.user);
                this.isEdit = false;
                this.authService.setUser(response.user);
                this.eService.userCreated(response.user);
                alert(response.message);
            }
        );
    }
}
