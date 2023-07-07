import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ScanService } from 'app/services/scan/scan.service';

@Component({
    selector     : 'etat',
    templateUrl  : './etat.component.html',
    styleUrls    : ['./etat.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EtatComponent
{
    isLoading: boolean = false;
    dataSourceGeneral = new MatTableDataSource<any>([]);
    dataSourcePresence = new MatTableDataSource<any>([]);
    dataSourceRetard = new MatTableDataSource<any>([]);
    displayedColumnsGeneral: string[] = [
        'nom',
        'prenom',
        'datecreation',
        'heure_arrive',
        'heure_deperd',
        'localisation',
        'statut',
    ];
    displayedColumns: string[] = [
        'nom',
        'prenom',
        'datecreation',
        'heure_arrive',
        'heure_deperd',
        'localisation',
        'statut',
    ];
    displayedColumnsRetard: string[] = [
        'nom',
        'prenom',
        'datecreation',
        'heure_arrive',
        'heure_deperd',
        'localisation',
        'statut',
    ];
    /**
     * Constructor
     */
    constructor(
        private scanService : ScanService
    )
    {
    }
    ngOnInit(): void {
           this.getListePresence()
           this.getListeRetard()
           this.getListeGeneral()
        // this.generateForm();
        
    }


    getListeGeneral() {
        this.isLoading = true; // Démarre le loader
        const getListeGeneral = this.scanService.getListeGeneral();
        getListeGeneral.subscribe(result => {
            console.log(result, 'General');
            
            this.isLoading = false; // stop le loader
            this.dataSourceGeneral = new MatTableDataSource<any>(result);
            // this.dataSourcePresence.paginator = this.paginationAttente;
            // console.log(this.paginationAttente, 'paginationAttente');
            // this.dataSourcePresence.sort = this.sort;
            // this.pagination.page = 1;
            // this.pagination.startIndex = 0;
            // this.pagination.length = result.length;
        });
    }

    getListePresence() {
        this.isLoading = true; // Démarre le loader
        const getListePresence = this.scanService.getListePresence();
        getListePresence.subscribe(result => {
            console.log(result, 'présence');
            
            this.isLoading = false; // stop le loader
            this.dataSourcePresence = new MatTableDataSource<any>(result);
            // this.dataSourcePresence.paginator = this.paginationAttente;
            // console.log(this.paginationAttente, 'paginationAttente');
            // this.dataSourcePresence.sort = this.sort;
            // this.pagination.page = 1;
            // this.pagination.startIndex = 0;
            // this.pagination.length = result.length;
        });
    }


    getListeRetard(){
        this.isLoading = true; // Démarre le loader
        const getListeRetard = this.scanService.getListeRetard();
        getListeRetard.subscribe(result => {
            console.log(result, 'Retard');
            
            this.isLoading = false; // stop le loader
            this.dataSourceRetard = new MatTableDataSource<any>(result);
            // this.dataSourceRetard.paginator = this.paginationAttente;
            // console.log(this.paginationAttente, 'paginationAttente');
            // this.dataSourceRetard.sort = this.sort;
            // this.pagination.page = 1;
            // this.pagination.startIndex = 0;
            // this.pagination.length = result.length;
        });   
    }
}
