

export interface Permission
{
    id : number,
    name : string,
}

export interface Role {
    id : number,
    name: string,
    permissions : Permission [],
    state : boolean
}


export interface User {
    id: number
    name : string,
    email : string,
    role? : Role,
    state : boolean
    password? : string
}
