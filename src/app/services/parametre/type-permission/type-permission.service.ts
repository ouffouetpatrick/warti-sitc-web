import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { TypePermission } from 'app/interfaces/typePermission/typePermission';
// import { TypePermission } from 'app/interfaces/typePermission/typePermission';

@Injectable({
    providedIn: 'root'
})
export class TypePermissionService {

    private url = `${environment.api}/typepermission`;

    constructor(private http: HttpClient) { }

    // Ajoute un nouvel enregistrement de TypePermission
    // save(typePermission: TypePermission): Observable<any> {
    //     return this.http.post<any>(`${this.url}`, typePermission);
    // }

    // Modifier un enregistrement de TypePermission
    update(typePermission: TypePermission): Observable<any> {
        return this.http.put<any>(`${this.url}/${typePermission.id}`, typePermission);
    }

    // Supprime un enregistrement de TypePermission
    delete(primaryKey: any): Observable<any> {
        return this.http.delete<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Trouve tous les enregistrements de TypePermission
    findAll(): Observable<any> {
        return this.http.get<any>(`${this.url}`);
    }

    query(queryParameter: any): Observable<any> {
        console.log(queryParameter);
        return this.http.get<any[]>(`${this.url}/query/${encodeURI(JSON.stringify(queryParameter))}`);
    }

    // Trouve un seul enregistrements de TypePermission
    findOne(primaryKey: any): Observable<any> {
        return this.http.get<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Traiter un icident en ajoutant le commantaire
    // updateCommentaireTypePermission(typePermission: TypePermission): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${typePermission.id}`, typePermission);
    // }


    
    // Route API metier
//Liste des types de permission
    getListeTypepermission(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/typePermission/listeTypePermission`);
    }



    // Fonction d'ajout d'n nouveau typepermission 
    AjouterTypepermission(typepermission): Observable<any> {
        return this.http.post<any>(`${environment.api}/metier/typePermission/nouveauTypePermission`,typepermission);
    }


     // Fonction de suppression des typepermissions 
     SuppirmerTypepermission(typepermission): Observable<any> {
        return this.http.post<any>(`${environment.api}/metier/typePermission/annulerTypePermission`,typepermission);
    }


}
