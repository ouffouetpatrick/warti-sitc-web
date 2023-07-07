import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GestionEtatService {

    private url = `${environment.api}/scan`;


    constructor(private http: HttpClient) { }


    public checked: string = 'Jour';

    getLogo(): Observable<any> {
        return this.http.get<any>('assets/json/logos.json');
    }


      // Route API metier

//Liste de Présence Journalière
getRechercheJournaliere(query): Observable<any> {
    return this.http.post<any>(`${environment.api}/metier/scan/rechercherByDay`, query);
}


//Liste de Présence Hebdo
getrechercherByWeek(query): Observable<any> {
    return this.http.post<any>(`${environment.api}/metier/scan/rechercherByWeek`, query);
}


//Liste de Présence Mensuelle
getrechercherByMonth(query): Observable<any> {
    return this.http.post<any>(`${environment.api}/metier/scan/rechercherByMonth`, query);
}



//Liste de Présence Annuelle
getrechercherByYear(query): Observable<any> {
    return this.http.post<any>(`${environment.api}/metier/scan/rechercherByYear`, query);
}


// //Liste de Retard
// getListeRetard(): Observable<any> {
//     return this.http.get<any>(`${environment.api}/metier/scan/recupererlistederetard`);
// }

// //Liste de Retard
// getListeGeneral(): Observable<any> {
//     return this.http.get<any>(`${environment.api}/metier/scan/recupererlistedepresenceGeneral`);
// }


//Liste des Statuts d'assiduiutées
getListeStatut(): Observable<any> {
    return this.http.get<any>(`${environment.api}/metier/scan/recupererlistedeStatut`);
}

}