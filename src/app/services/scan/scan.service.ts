import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
// import { Scan } from 'app/interfaces/typePermission/typePermission';
// import { Scan } from 'app/interfaces/typePermission/typePermission';

@Injectable({
    providedIn: 'root'
})
export class ScanService {

    private url = `${environment.api}/scan`;

    constructor(private http: HttpClient) { }

    // Ajoute un nouvel enregistrement de Scan
    // save(typePermission: Scan): Observable<any> {
    //     return this.http.post<any>(`${this.url}`, typePermission);
    // }

    // Modifier un enregistrement de Scan
    // update(typePermission: Scan): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${typePermission.id}`, typePermission);
    // }

    // Supprime un enregistrement de Scan
    delete(primaryKey: any): Observable<any> {
        return this.http.delete<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Trouve tous les enregistrements de Scan
    findAll(): Observable<any> {
        return this.http.get<any>(`${this.url}`);
    }

    query(queryParameter: any): Observable<any> {
        console.log(queryParameter);
        return this.http.get<any[]>(`${this.url}/query/${encodeURI(JSON.stringify(queryParameter))}`);
    }

    // Trouve un seul enregistrements de Scan
    findOne(primaryKey: any): Observable<any> {
        return this.http.get<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Traiter un icident en ajoutant le commantaire
    // updateCommentaireScan(typePermission: Scan): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${typePermission.id}`, typePermission);
    // }


    
    // Route API metier
//Liste de Présence
    getListePresence(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/scan/recupererlistedepresence`);
    }


    //Liste de Retard
    getListeRetard(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/scan/recupererlistederetard`);
    }

    //Liste de Retard
    getListeGeneral(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/scan/recupererlistedepresenceGeneral`);
    }



    // // Fonction d'ajout d'n nouveau scan 
    // AjouterTypepermission(scan): Observable<any> {
    //     return this.http.post<any>(`${environment.api}/metier/typePermission/nouveauScan`,scan);
    // }


    //  // Fonction de suppression des scans 
    //  SuppirmerTypepermission(scan): Observable<any> {
    //     return this.http.post<any>(`${environment.api}/metier/typePermission/annulerScan`,scan);
    // }


}
