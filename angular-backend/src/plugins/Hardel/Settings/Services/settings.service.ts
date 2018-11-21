

import {Injectable} from '@angular/core';
import {Role, Permission, User} from './settings.interfaces';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {MasterService} from '@Lortom/services/master.service';

@Injectable()
export class SettingsService extends MasterService {

    listOfRoles: Role[];
    listOfUsers: User[];
    private _updateRoles = new Subject();
    updateRoles$ = this._updateRoles.asObservable();

    private _updateUsers = new Subject();
    updateUsers$ = this._updateUsers.asObservable();

    constructor(private http: HttpClient)
    {
        super();
        // write the api route for setting
         const urls = [
                { namePath : 'getPermission', path: 'permissions'},
                { namePath : 'getRoles', path: 'roles' },
                { namePath : 'saveRole', path: 'role'},
                { namePath : 'getUsers', path: 'users'},
                { namePath : 'saveUser', path: 'user'}
            ];
        // Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }

    /**
     * This function retrive the roles from the API (Laravel)
     * @returns {Observable<R>}
     */
    getRolesFrom() {
        return this.http.get(this.apiManager.getPathByName('getRoles'))
            .map( (response: {roles: Role[]}) => {
                return response.roles;
            });

    }

    getUsersFrom() {
        return this.http.get(this.apiManager.getPathByName('getUsers'))
            .map(
                (response: {users: User []}) => {
                    return response.users;
                }
            );
    }

    updateRoleInList(role: Role): void {
        this.updateItemInList(role, 'listOfRoles');
    }

    updateUserInList(user: User): void {
        this.updateItemInList(user, 'listOfUsers');
    }

    /**
     * This function retrive the permissions from the API (Laravel)
     * @returns {Observable<R>}
     */
    getPermissionsFrom() {
        return this.http.get(this.apiManager.getPathByName('getPermission'))
            .map((response: {permissions: Permission[]}) =>  {
                return response.permissions;
            });
    }

    /**
     * This function set the Roles
     * @param roles
     */
    setRoles(roles: Role[]): void {
        this.setItem('roles', roles);
        this.listOfRoles = roles;
    }

    /**
     * This function set the Users
     * @param users
     */
    setUsers(users: User[]): void {
        this.setItem('users', users);
        this.listOfUsers = users;
    }


    /**
     * This function is to set new role into the listOfRoles
     * @param role
     */
    setRole(role: Role) {
        let roles = this.getRoles();
        roles.push(role);
       this.deleteRoleFromCache();
       this.setRoles(roles);
    }

    /**
     * This function is to set new User into the listOfUsers
     * @param user
     */
    setUser(user : User)
    {
        let users = this.getUsers();
        users.push(user);
        this.deleteUserFromCache();
        this.setUsers(users);
    }


    /**
     * This function delete listOfRoles from Cache
     */
    deleteRoleFromCache() : void
    {
        this.deleteItem('roles','listOfRoles');
    }

    /**
     * This function delete listOfUsers from Cache
     */
    deleteUserFromCache() : void
    {
        this.deleteItem('users','listOfUsers');
    }

    /**
     * This function check if Dataset of Roles exist
     * @returns {boolean}
     */
    checkRolesExist()
    {
        return this.checkItemExist('roles');
    }

    /**
     * This function check if Dataset of Users exist
     * @returns {boolean}
     */
    checkUsersExist()
    {
        return this.checkItemExist('users');
    }

    /**
     * This function return Role passing a property
     * @param name
     * @param value
     * @returns {Role}
     */
    getRoleByProperty(name : string, value : any)
    {
        return this.getItemByProperty(name,value,'roles','listOfRoles') as Role;
    }

    /**
     * This function return User passing a property
     * @param name
     * @param value
     * @returns {User}
     */
    getUserByProperty(name : string, value : any) : User
    {
        return this.getItemByProperty(name,value,'users','listOfUsers') as User;
    }

    /**
     * This function check if a role has permission
     * @param role
     * @param permission
     * @returns {boolean}
     */
    roleHasPermission(role: Role, permission : string)
    {
        let response = false;

        role.permissions.forEach(
            (p : Permission) => {
               if(p.name === permission)
               {
                   response = true;
               }
            });
        return response;
    }

    /**
     * This function return a Role Array
     * @returns {Role[]}
     */
    getRoles() : Role [] {

        return this.getItem('roles','listOfRoles') as Role[];
    }

    /**
     * This function return a User Array
     * @returns {User[]}
     */
    getUsers() : User []
    {
        return this.getItem('users','listOfUsers') as User[];
    }

    /**
     * This function call API in order to Update the Role
     * @param role
     * @returns {Observable<R>}
     */
    saveRole(role : Role) : Observable<any> {

        return this.http.put(this.apiManager.getPathByName('saveRole'),role,this.getOptions())
            .map((response : {role : Role}) => {
                return response.role;
            });
    }

    /**
     * This function call API in order to update the User
     * @param user
     * @returns {Observable<R>}
     */
    saveUser(user : User) : Observable<any> {

        return this.http.put(this.apiManager.getPathByName('saveUser'),user,this.getOptions())
            .map((response : {user: User}) => {
                return response.user;
            });
    }

    /**
     * This function call API in order to create new Role
     * @param role
     * @returns {Observable<R>}
     */
    newRole(role : Role) : Observable<any> {

        return this.http.post(this.apiManager.getPathByName('saveRole'),role,this.getOptions())
            .map(
                (response : {role: Role}) => {
                    return response.role;
                }
            );
    }

    /**
     * This function call API in order to create new User
     * @param user
     * @returns {Observable<R>}
     */
    newUser(user : User) : Observable<any> {

        return this.http.post(this.apiManager.getPathByName('saveUser'),user,this.getOptions())
            .map(
                (response : {user: User}) => {
                    return response.user;
                }
            );
    }

    /**
     * This function call API in order to delete Array of Role
     * @param roles
     * @returns {Observable<R>}
     */
    deleteRoles(roles : Role[]) : Observable<any> {

        return this.http.put(this.apiManager.getPathByName('getRoles'),roles,this.getOptions())
            .map(
                (response : {roles: Role[]}) => {
                    return response.roles;
                }
            );
    }

    /**
     * This function call API in order to delete Array of User
     * @param users
     * @returns {Observable<R>}
     */
    deleteUsers (users : User[]) : Observable<any> {

        return this.http.put(this.apiManager.getPathByName('getUsers'),users,this.getOptions())
            .map(
                (response : {users: User[]}) => {
                    return response.users;
                }
            );
    }

    /**
     * This function emit an Event
     */
    updateListOfRoles()
    {
        this._updateRoles.next();
    }

    /**
     * This function emit an Event
     */
    updateListOfUsers()
    {
        this._updateUsers.next();
    }
}

