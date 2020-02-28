
export interface User {
    username: string;
    name: string;
    token?: string;
    permissions: Permission [];
}

export interface Permission {
    id: number;
    name: string;
}
