export interface Parent {
    id: number;
    firstName: string;
    lastName: string;
    relationship:string;
    phoneNumber:string;
    email:string;
    address?:string;
    childCount?: number;
}

export interface Child {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    classname: string;
}

export interface ParentFormData{
    firstName: string;
    lastName: string;
    relationship:string;
    phoneNumber?:string;
    email?:string;
    address?:string;
}
