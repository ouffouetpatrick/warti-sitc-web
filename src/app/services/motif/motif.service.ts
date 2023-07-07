import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Motif } from 'app/interfaces/motif/motif';
// import { Motif } from 'app/interfaces/motif/motif';

@Injectable({
    providedIn: 'root'
})
export class MotifService {
    get(arg0: { order: { id: string; }; }) {
      throw new Error('Method not implemented.');
    }

    private url = `${environment.api}/motif`;

    constructor(private http: HttpClient) { }

    // Ajoute un nouvel enregistrement de Motif
    // save(motif: Motif): Observable<any> {
    //     return this.http.post<any>(`${this.url}`, motif);
    // }

    //Modifier un enregistrement de Motif
    update(motif: Motif): Observable<any> {
        return this.http.put<any>(`${this.url}/${motif.id}`, motif);
    }

    // Supprime un enregistrement de Motif
    delete(primaryKey: any): Observable<any> {
        return this.http.delete<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Trouve tous les enregistrements de Motif
    findAll(): Observable<any> {
        return this.http.get<any>(`${this.url}`);
    }

    query(queryParameter: any): Observable<any> {
        console.log(queryParameter);
        return this.http.get<any[]>(`${this.url}/query/${encodeURI(JSON.stringify(queryParameter))}`);
    }

    // Trouve un seul enregistrements de Motif
    findOne(primaryKey: any): Observable<any> {
        return this.http.get<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Traiter un icident en ajoutant le commantaire
    // updateCommentaireMotif(motif: Motif): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${motif.id}`, motif);
    // }


    
    // Route API metier


// Route de la liste des motif en
    getListeMotif(): Observable<any> {
        return this.http.get<any>(`${environment.api}/metier/motif/listeMotif`);
    }



    // // Route de la liste des motif en Validée
    // getListeMotifValide(): Observable<any> {
    //     return this.http.get<any>(`${environment.api}/metier/statutMotif/recupererMotifValider`);
    // }


    // Route de la liste des motif Rejetée
    // getListeMotifRejeter(): Observable<any> {
    //     return this.http.get<any>(`${environment.api}/metier/statutMotif/recupererMotifrejeter`);
    // }

// Valider une motif en attente
    // ValiderMotif(statutMotif): Observable<any> {
    //     return this.http.post<any>(`${environment.api}/metier/statutMotif/validerMotif`,statutMotif);
    // }

    // Récupère la liste des motifs en attent
    // Passer le même que celui passer dans le component
    // demandeMotif(motif): Observable<any> {
    //     return this.http.post<any>(`${environment.api}/metier/motif/demandeMotif`,motif);
    // }

// Fonction d'ajout d'n nouveau motif de rejet
    AjouterMotif(motif): Observable<any> {
        return this.http.post<any>(`${environment.api}/metier/motif/nouveauMotif`,motif);
    }

    //Fonction d'ajout d'n nouveau motif de rejet
    SupprimerMotif(motif): Observable<any> {
        return this.http.post<any>(`${environment.api}/metier/motif/annulerMotif`,motif);
    }


}
