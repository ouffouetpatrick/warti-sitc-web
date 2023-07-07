import { Permission } from "../permission/permission";
import { Statut } from "../statut/statut";

export interface StatutPermission
{
    id?:number;
    actif?:string;
    empty1?:string;
    empty2?:string;
    empty3?:string;
    geler?:number;
    dateCreation:string;
    permission:Permission;
    idusrcreation:number;
    statut:Statut
}