import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
// import { Dashboard } from 'app/interfaces/dashboard/dashboard';
// import { Dashboard } from 'app/interfaces/dashboard/dashboard';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private url = `${environment.api}/scan`;

    constructor(private http: HttpClient) { }

    // Ajoute un nouvel enregistrement de Dashboard
    // save(dashboard: Dashboard): Observable<any> {
    //     return this.http.post<any>(`${this.url}`, dashboard);
    // }

    // update(dashboard: Dashboard): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${dashboard.id}`, dashboard);
    // }

    // Supprime un enregistrement de Dashboard
    delete(primaryKey: any): Observable<any> {
        return this.http.delete<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Trouve tous les enregistrements de Dashboard
    findAll(): Observable<any> {
        return this.http.get<any>(`${this.url}`);
    }

    query(queryParameter: any): Observable<any> {
        console.log(queryParameter);
        return this.http.get<any[]>(`${this.url}/query/${encodeURI(JSON.stringify(queryParameter))}`);
    }

    // Trouve un seul enregistrements de Dashboard
    findOne(primaryKey: any): Observable<any> {
        return this.http.get<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Traiter un icident en ajoutant le commantaire
    // updateCommentaireQrcode(dashboard: Dashboard): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${dashboard.id}`, dashboard);
    // }


    
    // Route API metier



    // getChaineCaractere(): Observable<any> {
    //     return this.http.get<any>(`${environment.api}/metier/dashboard/generate-string-json`);
    // }

    // SaveQrcode(formData): Observable<any> {
    //     return this.http.post<any>(`${environment.api}/metier/dashboard/nouveauQrcode`,formData);
    // }



    // Fonction du tableau du taux annuel
     TauxAnnuel(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/scan/recupererMonthData`);
    }


     // Fonction de la moyenne de permission selon le statut
     PermissionByStatut(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererNombrePermissionSatut`);
    }

    
     // Fonction des 4 types de permissions les plus demandés
     QuatreTypePermission(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/statutPermission/recupererTypePermission`);
    }

     // Fonction pour récuperer les infos du Graph des données du jour
     recupérerinfoDay(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/scan/recupererDayData`);
    }

 // Fonction pour récuperer les infos selon le genre
 recupérerRepartitionGenre(): Observable<any> {
    return this.http.get<any>(`${environment.api}/metier/utilisateur/repartitionUtilisateur`);
}

// Fonction pour récuperer le Top 5 des retardataires
 recupérerRetardataire(): Observable<any> {
    return this.http.get<any>(`${environment.api}/metier/scan/recupererRetardataireData`);
}


// Fonction pour récuperer les retard par genre
recupérerRetardByGenre(): Observable<any> {
    return this.http.get<any>(`${environment.api}/metier/scan/repartitionRetardData`);
}



// Fonction pour récuperer les Permission par genre
recupérerPermissionByGenre(): Observable<any> {
    return this.http.get<any>(`${environment.api}/metier/permission/repartitionPermissionData`);
}

// Fonction pour récuperer les Permission par genre
recupérerNombreUser(): Observable<any> {
    return this.http.get<any>(`${environment.api}/metier/utilisateurProfil/recupererNombreEmploye`);
}


// Fonction pour récuperer le nombre de Permissionnaire
recupérerNombrePermissionnaire(): Observable<any> {
    return this.http.get<any>(`${environment.api}/metier/permission/recupererPermissionData`);
}
}
