import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Qrcode } from 'app/interfaces/qrcode/qrcode';
// import { Qrcode } from 'app/interfaces/qrcode/qrcode';

@Injectable({
    providedIn: 'root'
})
export class QrcodeService {

    private url = `${environment.api}/qrcode`;

    constructor(private http: HttpClient) { }

    // Ajoute un nouvel enregistrement de Qrcode
    // save(qrcode: Qrcode): Observable<any> {
    //     return this.http.post<any>(`${this.url}`, qrcode);
    // }

    update(qrcode: Qrcode): Observable<any> {
        return this.http.put<any>(`${this.url}/${qrcode.id}`, qrcode);
    }

    // Supprime un enregistrement de Qrcode
    delete(primaryKey: any): Observable<any> {
        return this.http.delete<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Trouve tous les enregistrements de Qrcode
    findAll(): Observable<any> {
        return this.http.get<any>(`${this.url}`);
    }

    query(queryParameter: any): Observable<any> {
        console.log(queryParameter);
        return this.http.get<any[]>(`${this.url}/query/${encodeURI(JSON.stringify(queryParameter))}`);
    }

    // Trouve un seul enregistrements de Qrcode
    findOne(primaryKey: any): Observable<any> {
        return this.http.get<any>(`${this.url}/${encodeURI(JSON.stringify(primaryKey))}`);
    }

    // Traiter un icident en ajoutant le commantaire
    // updateCommentaireQrcode(qrcode: Qrcode): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${qrcode.id}`, qrcode);
    // }


    
    // Route API metier



    // getChaineCaractere(): Observable<any> {
    //     return this.http.get<any>(`${environment.api}/metier/qrcode/generate-string-json`);
    // }

    SaveQrcode(formData): Observable<any> {
        return this.http.post<any>(`${environment.api}/metier/qrcode/nouveauQrcode`,formData);
    }

}
