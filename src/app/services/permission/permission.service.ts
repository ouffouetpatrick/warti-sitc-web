import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Permission } from 'app/interfaces/permission/permission';
// import { Permission } from 'app/interfaces/permission/permission';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    private url = `${environment.api}/permission`;

    constructor(private http: HttpClient) { }

    // Ajoute un nouvel enregistrement de Permission
    // save(permission: Permission): Observable<any> {
    //     return this.http.post<any>(`${this.url}`, permission);
    // }

    // Modifier un enregistrement de Permission
    // update(permission: Permission): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${permission.id}`, permission);
    // }

    // Supprime un enregistrement de Permission
    delete(primaryKey: any): Observable<any> {
        return this.http.delete<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Trouve tous les enregistrements de Permission
    findAll(): Observable<any> {
        return this.http.get<any>(`${this.url}`);
    }

    query(queryParameter: any): Observable<any> {
        console.log(queryParameter);
        return this.http.get<any[]>(`${this.url}/query/${encodeURI(JSON.stringify(queryParameter))}`);
    }

    // Trouve un seul enregistrements de Permission
    findOne(primaryKey: any): Observable<any> {
        return this.http.get<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Traiter un icident en ajoutant le commantaire
    update(permission: Permission): Observable<any> {
        return this.http.put<any>(`${this.url}/${permission.id}`, permission);
    }


    
    // Route API metier


// Route de la liste des permission en Attente
// les permission en fonction de l'utilisateur connecté
    getListePermissionAttente(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererPermissionAttente`);
    }
// Les permissions de tout les utilisateur
    getListePermissionAttenteAll(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererPermissionAttenteAll`);
    }

    // Route de la liste des permission en Validée
    getListePermissionValide(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererPermissionValider`);
    }
// Les permission de tout les utilisateurs
    getListePermissionValideAll(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererPermissionValiderAll`);
    }


    // Route de la liste des permission Rejetée
    getListePermissionRejeter(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererPermissionrejeter`);
    }
  // Route de la liste des permission Rejetée de tout les utilisateurs
  getListePermissionRejeterAll(): Observable<any> {
    return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererPermissionrejeterAll`);
}


// Valider une permission en attente
    ValiderPermission(statutPermission): Observable<any> {
        return this.http.post<any>(`${environment.api}/metier/statutPermission/validerPermission`,statutPermission);
    }


    // Rejeter une permission en attente
    RejeterPermission(permision): Observable<any> {
        return this.http.post<any>(`${environment.api}/metier/permission/rejeterPermission`,permision);
    }

    AjouterPermission(permission): Observable<any> {
        return this.http.post<any>(`${environment.api}/metier/permission/demandePermission`,permission);
    }


    // Récupère la liste des permissions en attent
    // Passer le même que celui passer dans le component
    // demandePermission(permission): Observable<any> {
    //     return this.http.post<any>(`${environment.api}/metier/permission/demandePermission`,permission);
    // }

    // Route de la liste des permission Rejetée
    // getListeTypePermission(): Observable<any> {
    //     return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererPermissionrejeter`);
    // }
}
