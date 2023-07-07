import { Motif } from "../motif/motif";
import { Permission } from "../permission/permission";

export interface TypePermission
{
    id?:number;
    libelle?:string;
    empty1?:string;
    empty2?:string;
    empty3?:string;
    geler?:number;
    dateCreation:string;
    idusrcreation:number;
    permission:Permission[];

}