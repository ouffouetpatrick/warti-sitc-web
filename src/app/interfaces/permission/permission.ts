import { Utilisateur } from "../administration/utilisateur";
import { Motif } from "../motif/motif";
import { StatutPermission } from "../statutpermission/statutPermission";
import { TypePermission } from "../typePermission/typePermission";

export interface Permission
{
    id?:number;
    detail?:string;
    date_debut:string;
    date_fin:string;
    utilisateur: number;
    empty1?:string;
    empty2?:string;
    empty3?:string;
    geler?:number;
    dateCreation:string;
    idusrcreation:number;
    statutPermission:StatutPermission[];
    typePermission: TypePermission;

}