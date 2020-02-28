/**
 * Created by hernan on 27/10/2017.
 */


export interface User {
    name?: string;
    password?: string;
    username?: string;
    permissions: Permission[];
}

export interface Permission {
    id: number;
    name: string;
}
