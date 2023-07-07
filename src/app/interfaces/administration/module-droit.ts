import { Droit } from './droit';
import { Module } from './module';
export interface ModuleDroit {
    id?: number;
    empty1?: string;
    empty2?: string;
    empty3?: string;
    geler: number;
    dateCreation: string;
    idusrcreation: number;
    module?: Module;
    droit?: Droit;
}