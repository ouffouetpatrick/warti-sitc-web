import { StatutPermission } from "../statutpermission/statutPermission";

export interface Statut
{
    id?:number;
    actif?:string;
    empty1?:string;
    empty2?:string;
    empty3?:string;
    geler?:number;
    dateCreation:string;
    idusrcreation:number;
    statutPermission:StatutPermission[];

}