import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'app/constants';
import { Statut } from 'app/interfaces/statut/statut';
import { Pagination } from 'app/interfaces/utils/Pagination';
import { GestionEtatService } from 'app/services/gestion-etat/gestion-etat.service';
import moment from 'moment';
import { TDocumentDefinitions } from 'pdfmake/build/pdfmake';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector     : 'gestion-etat',
    styleUrls : ['./gestion-etat.component.scss'],
    templateUrl  : './gestion-etat.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GestionEtatComponent implements OnInit, AfterViewInit{
    SearchJourform: FormGroup;
    SearchSemaineform: FormGroup;
    SearchMoisform: FormGroup;
    SearchAnneeform: FormGroup;
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    dataSourceJournalier = new MatTableDataSource<any>([]);
    dataSourceHebdo = new MatTableDataSource<any>([]);
    dataSourceMonth = new MatTableDataSource<any>([]);
    dataSourceYear = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('paginationJournalier') paginationJournalier: MatPaginator;
    @ViewChild('paginationHebdo') paginationHebdo: MatPaginator;
    @ViewChild('paginationMensuel') paginationMensuel: MatPaginator;
    @ViewChild('paginationAnnuelle') paginationAnnuelle: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    page = { pageSize: PAGE_SIZE, pageSizeOptions: PAGE_SIZE_OPTIONS };
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    pagination: Pagination = { page: 1, size: 10, startIndex: 0 };
    assiduiteExportation: any [] ;
    showPagination : number = 0 ;
    fileName: any = 'RAPPORT_PRESENCE' + moment(new Date()).format('YYYY-MM-DD') + '.xlsx';
    mois: any[] = [
        {
            id: 1,
            name: 'Janvier',
        },
        {
            id: 2,
            name: 'Février',
        },
        {
            id: 3,
            name: 'Mars',
        },
        {
            id: 4,
            name: 'Avril',
        },
        {
            id: 5,
            name: 'Mai',
        },
        {
            id: 6,
            name: 'Juin',
        },
        {
            id: 7,
            name: 'Juillet',
        },
        {
            id: 8,
            name: 'Août',
        },
        {
            id: 9,
            name: 'Septembre',
        },
        {
            id: 10,
            name: 'Octobre',
        },
        {
            id: 11,
            name: 'Novembre',
        },
        {
            id: 12,
            name: 'Décembre',
        },
    ];
    annees: any[] = [];
    ListeSemaineGeneral: any[] = [];
    ListeAnneeGeneral: any[] = [];
    currentWeek: number;
    selectValue: String;
    listeStatut : Statut [] = [];

    displayedColumns: string[] = 
        [
            'nom', 
            'prenom', 
            'datecreation', 
            'heure_arrive', 
            'heure_depart',
            'statut',
            
        ];
        displayedColumnsHebdo: string[] = 
        [
            'nom', 
            'prenom', 
            'datecreation', 
            'heure_arrive', 
            'heure_depart',
            'statut',
            
        ];

   
    checked : string;
    recensementControle = new FormControl('Jour');

    // nomFichier: any = 'Liste_Visite';

    constructor(
        private _formBuilder: FormBuilder,
        private gestioEtatService: GestionEtatService,
    ){}


    ngOnInit(): void {
        this.selectValue = 'All';
        const dateActuel = new Date();
        const currentYear = dateActuel.getFullYear();
        this.initFormMois();
        this.initFormSemaine();
        this.initFormJour();
        this.initFormAnnee();
        // this.getListeGeneral();
        this.getListeStatut();
        // rempli le tableau des année pour la recherche annuelle
        for (var i = currentYear; i >= 2000; i--) {
            let el = {
                id: i,
                name: `${i}`,
            };
            this.annees.push(el);
            this.ListeAnneeGeneral.push(el);
        }

        // rempli le tableau des semaines pour la recherche hebdomadaire
        for (let j = 1; j <= 52; j++) {
            let element = { IdSemaine: j, NomSemaine: `${j}` };

            this.ListeSemaineGeneral.push(element);
        }

        // this.recensementControle = new FormControl('Jour');
        this.recensementControle = new FormControl(this.gestioEtatService.checked);

        this.checked = this.gestioEtatService.checked;
    }

    ngAfterViewInit(): void {
        this.getCurrentWeek();
    }

    initFormJour(): void {
        this.SearchJourform = this._formBuilder.group({
            dateJour: [new Date()],
            statut: [''],
        });
    }

    initFormSemaine(): void {
        this.getCurrentWeek();
        const year = new Date().getFullYear();
        const debut_debut = moment()
            .day('Monday')
            .year(year)
            .week(this.currentWeek);
        const debut_fin = debut_debut.clone().weekday(7);
        this.SearchSemaineform = this._formBuilder.group({
            dateDebut: [debut_debut.toISOString()],
            dateFin: [debut_fin.toISOString()],
            semaine: [''],
            annee: [year],
            statut: ['']
        });
        
    }

    getCurrentWeek(): void {
        // retourne le numéro de la semaine dans laquelle on se trouce
        function getWeekNumber(date): any {
            // Copy date so don't modify original
            date = new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            );
            // Set to nearest Thursday: current date + 4 - current day number
            // Make Sunday's day number 7
            date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
            // Get first day of year
            let yearStart: any = new Date(
                Date.UTC(date.getUTCFullYear(), 0, 1)
            );
            // Calculate full weeks to nearest Thursday
            let weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
            // Return array of year and week number
            return weekNo;
        }

        this.currentWeek = getWeekNumber(new Date());

        this.ListeSemaineGeneral.map((item) => {
            if (item.IdSemaine === this.currentWeek) {
                this.SearchSemaineform.patchValue({ semaine: item.IdSemaine });
            }
        });
    }

    initFormMois(): void {
        this.getCurrentWeek();
        const year = new Date().getFullYear();
        const debut_debut = moment()
            .day('Monday')
            .year(year)
            .week(this.currentWeek);
        const debut_fin = debut_debut.clone().weekday(7);
        this.SearchMoisform = this._formBuilder.group({
            mois: [1],
            annee: [year],
            statut: [''],
        });

    }


    initFormAnnee(): void {
        this.getCurrentWeek();
        const year = new Date().getFullYear();
        const debut_debut = moment()
            .day('Monday')
            .year(year)
            .week(this.currentWeek);
        // const debut_fin = debut_debut.clone().weekday(7);
        this.SearchAnneeform = this._formBuilder.group({
             annee: [year],
             statut: [''],
            });
        
    }
    getNewWeekDayInterval(annee, semaine = this.currentWeek): void {
        const newMoment = moment().set('year', annee);
        const dateDebut = moment()
            .day('Monday')
            .year(this.SearchSemaineform.value['annee'])
            .week(this.SearchSemaineform.value['semaine']);
        const dateFin = dateDebut.clone().weekday(7);

        this.SearchSemaineform.patchValue({
            dateDebut: dateDebut.toISOString(),
            dateFin: dateFin.toISOString(),
        });
    }


    // getListeGeneral() {
    //     this.isLoading = true; // Démarre le loader
    //     const getListeGeneral = this.gestioEtatService.getListeGeneral();
    //     getListeGeneral.subscribe(result => {
    //         console.log(result, 'General');
            
    //         this.isLoading = false; // stop le loader
    //         this.dataSource = new MatTableDataSource<any>(result);
    //         // this.dataSourcePresence.paginator = this.paginationJournalier;
    //         // console.log(this.paginationJournalier, 'paginationJournalier');
    //         // this.dataSourcePresence.sort = this.sort;
    //         // this.pagination.page = 1;
    //         // this.pagination.startIndex = 0;
    //         // this.pagination.length = result.length;
    //     });
    // }



    // 


    // getListeRetard(){
    //     this.isLoading = true; // Démarre le loader
    //     const getListeRetard = this.scanService.getListeRetard();
    //     getListeRetard.subscribe(result => {
    //         console.log(result, 'Retard');
            
    //         this.isLoading = false; // stop le loader
    //         this.dataSourceRetard = new MatTableDataSource<any>(result);
    //         // this.dataSourceRetard.paginator = this.paginationJournalier;
    //         // console.log(this.paginationJournalier, 'paginationJournalier');
    //         // this.dataSourceRetard.sort = this.sort;
    //         // this.pagination.page = 1;
    //         // this.pagination.startIndex = 0;
    //         // this.pagination.length = result.length;
    //     });   
    // }


    
    // Affichage de la liste des types de permision
  
  
    getListeStatut() {
        // this.inProgress = true; // Démarre le loader
        const getListeStatut = this.gestioEtatService.getListeStatut();
    
        getListeStatut.subscribe((result) => {
            this.listeStatut = result;
             console.log(this.listeStatut, 'liste Statut')
        });
    }

    // Fonction de Recherche Journalière
    getRechercheJournaliere() {
            this.isLoading = true; // Démarre le loader
            const getRechercheJournaliere = this.gestioEtatService.getRechercheJournaliere({
                dateJour: this.SearchJourform.value['dateJour'],
                statut: this.SearchJourform.value['statut'],
            });
            getRechercheJournaliere.subscribe(result => {
                console.log(result, 'Recherche Journalier');
                
                this.isLoading = false; // stop le loader
                this.dataSourceJournalier = new MatTableDataSource<any>(result);
                this.assiduiteExportation = result;
                this.dataSourceJournalier.paginator = this.paginationJournalier;
                console.log(this.paginationJournalier, 'paginationJournalier');
                this.dataSourceJournalier.sort = this.sort;
                this.pagination.page = 1;
                this.pagination.startIndex = 0;
                this.pagination.length = result.length;
            });
    }


    // Fonction de Recherche Hebdo
    getrechercherByWeek() {
        this.isLoading = true; // Démarre le loader
        const getrechercherByWeek = this.gestioEtatService.getrechercherByWeek({
            dateDebut: this.SearchSemaineform.value['dateDebut'],
            dateFin: this.SearchSemaineform.value['dateFin'],
            statut: this.SearchSemaineform.value['statut'],
        });
        getrechercherByWeek.subscribe(result => {
            console.log(result, 'Recherche Hebdo');
            
            this.isLoading = false; // stop le loader
            this.dataSourceHebdo = new MatTableDataSource<any>(result);
            this.assiduiteExportation = result;
            this.dataSourceHebdo.paginator = this.paginationHebdo;
            console.log(this.paginationHebdo, 'paginationHebdo');
            this.dataSourceHebdo.sort = this.sort;
            this.pagination.page = 1;
            this.pagination.startIndex = 0;
            this.pagination.length = result.length;
        });
    }


    // Fonction de Recherche Mensuelle
    getrechercherByMonth() {
        this.isLoading = true; // Démarre le loader
        const getrechercherByMonth = this.gestioEtatService.getrechercherByMonth({
            mois: this.SearchMoisform.value['mois'],
            annee:this.SearchMoisform.value['annee'],
            statut: this.SearchMoisform.value['statut'],
        });
        getrechercherByMonth.subscribe(result => {
            console.log(result, 'Recherche Hebdo');
            
            this.isLoading = false; // stop le loader
            this.dataSourceMonth = new MatTableDataSource<any>(result);
            this.assiduiteExportation = result;
            this.dataSourceMonth.paginator = this.paginationMensuel;
            console.log(this.paginationMensuel, 'paginationMensuel');
            this.dataSourceMonth.sort = this.sort;
            this.pagination.page = 1;
            this.pagination.startIndex = 0;
            this.pagination.length = result.length;
        });

    }


    // Fonction de Recherche Annuelle
    getrechercherByYear() {
        this.isLoading = true; // Démarre le loader
        const getrechercherByYear = this.gestioEtatService.getrechercherByYear({
            // mois: this.SearchMoisform.value['mois'],
            annee:this.SearchAnneeform.value['annee'],
            statut: this.SearchAnneeform.value['statut'],
        });
        getrechercherByYear.subscribe(result => {
            console.log(result, 'Recherche Annuelle');
            
            this.isLoading = false; // stop le loader
            this.dataSourceYear = new MatTableDataSource<any>(result);
            this.assiduiteExportation = result;
            this.dataSourceYear.paginator = this.paginationAnnuelle;
            console.log(this.paginationAnnuelle, 'paginationAnnuelle');
            this.dataSourceYear.sort = this.sort;
            this.pagination.page = 1;
            this.pagination.startIndex = 0;
            this.pagination.length = result.length;
        });

    }

    //Exporter en PDF

    // exportPdf() {
    //     // Determination de la période suivant le type //
    //     var PeriodeEtat = null;

    //     // const getLogo = this.gestioEtatService.getLogo();

    //     // getLogo.subscribe(
    //         // (result) => {
    //         //     const logo = result.logo_onad;

    //             PeriodeEtat =
    //                 [
    //                     {
    //                         style: 'styleTab',
    //                         table: {
    //                             widths: ['*', 'auto'],
    //                             body: [
    //                                 [
    //                                     {
    //                                         text: 'COLLECTE DE DONNEES',
    //                                         border: [false, false, false, true],
    //                                         style: 'header'
    //                                     },
    //                                     // {
    //                                     //     image: logo,
    //                                     //     width: 100,
    //                                     //     height: 30,
    //                                     //     border: [false, false, false, true],

    //                                     // }
    //                                 ],
    //                             ]
    //                         }
    //                     },

    //                     {
    //                         text: 'ETAT DES EQUIPEMENTS DU 07/02/2023',
    //                         style: 'subheader1'
    //                     },

    //                     {
    //                         text: 'DATE D\'IMPRESSION : 07/02/2023 12:00:00 : OUFFOUET PATRICK',
    //                         style: 'subheader2'
    //                     },

    //                     {
    //                         style: 'smarTab',
    //                         table: {
    //                             widths: [70, '*', 150, '*'],
    //                             body: [
    //                                 [
    //                                     {
    //                                         text: 'STATUT',
    //                                         style: 'smarTabText',
    //                                         fillColor: '#eeeeee',
    //                                     },
    //                                     {
    //                                         text: 'tous',
    //                                         alignment: 'center',
    //                                         style: 'smarTabText',
    //                                     },
    //                                     {
    //                                         text: 'TOTAL EQUIPEMENT',
    //                                         style: 'smarTabText',
    //                                         fillColor: '#eeeeee',

    //                                     },
    //                                     {
    //                                         text: '10',
    //                                         alignment: 'center',
    //                                         style: 'smarTabText',
    //                                     },
    //                                 ],
    //                             ]
    //                         },

    //                     },

    //                     {
    //                         text: 'LISTE DES EQUIPEMENTS',
    //                         style: 'headerListEquipement'
    //                     },
    //                 ];

    //             let rows: any[] = [


    //                 [
    //                     { text: 'Equipement', style: 'tableHeader' },
    //                     { text: 'Milieu', style: 'tableHeader' },
    //                     { text: 'Type equipement', style: 'tableHeader' },
    //                     { text: 'Caracteristique', style: 'tableHeader' },
    //                     { text: 'Etat', style: 'tableHeader' },
    //                     { text: 'Anomalie', style: 'tableHeader' },
    //                     { text: 'Numero serie', style: 'tableHeader' },
    //                     { text: 'Capacite', style: 'tableHeader' },
    //                     { text: 'Fabricant', style: 'tableHeader' },
    //                     { text: 'Date implantation', style: 'tableHeader' },
    //                 ],
    //                 [
    //                     'egout',
    //                     'rural',
    //                     'assainissement',
    //                     'assainissement collectif',
    //                     'mauvais',
    //                     'bouché',
    //                     '560',
    //                     '20',
    //                     'SITC',
    //                     '17/03/2018',
    //                 ],
    //                 [
    //                     'egout',
    //                     'urbain',
    //                     'assainissement',
    //                     'assainissement non collectif',
    //                     'mauvais',
    //                     'bouché',
    //                     '6745',
    //                     '79',
    //                     'SITC',
    //                     '17/03/2018',
    //                 ],

    //             ];

    //             const documentDefinition: TDocumentDefinitions = {

    //                 content: [
    //                     PeriodeEtat,
    //                     {
    //                         style: 'equipementTab',
    //                         table: {
    //                             body: rows,
    //                         },

    //                     },
    //                 ],
    //                 styles: {
    //                     header: {
    //                         fontSize: 16,
    //                         bold: true,
    //                     },
    //                     styleTab: {
    //                         lineHeight: 2,
    //                     },
    //                     subheader1: {
    //                         margin: [0, 19, 0, 10],
    //                         alignment: 'center',
    //                         bold: true
    //                     },
    //                     subheader2: {
    //                         margin: [0, 0, 0, 20],
    //                         alignment: 'center',
    //                         fontSize: 10,
    //                         bold: true
    //                     },
    //                     smarTab: {
    //                         margin: [0, 0, 0, 20],
    //                     },
    //                     smarTabText: {
    //                         fontSize: 10,
    //                     },
    //                     headerListEquipement: {
    //                         alignment: 'center',
    //                         decoration: 'underline',
    //                         lineHeight: 1.5
    //                     },
    //                     equipementTab: {
    //                         margin: [0, 5, 0, 15],
    //                         fontSize: 8,
    //                     },
    //                     tableHeader: {
    //                         bold: true,
    //                         fontSize: 8,
    //                         fillColor: '#eeeeee',
    //                     },
    //                 }
    //             };
    //             pdfMake.createPdf(documentDefinition).open();
    //         // }
    //     // )

    // }
    // onTabsChange(event): void {
    //     this.showPagination = event.index;
    //     console.log(this.showPagination,'showPagination');

    //     if (this.showPagination === 0) {
    //         this.getRechercheJournaliere();
    //     }

    //     if (this.showPagination === 1) {
    //         this.getrechercherByWeek();
    //     }

    //     if (this.showPagination === 2) {
    //         this.getrechercherByMonth();
    //     }

    //     if (this.showPagination === 3) {
    //         this.getrechercherByYear();
    //     }

    // }
// Fonction qui recupère la valeur des mois
    moisCompletFrench = function (NbreMois) {
        // initializing an array
        const months = [
            'JANVIER',
            'FEVRIER',
            'MARS',
            'AVRIL',
            'MAI',
            'JUIN',
            'JUILLET',
            'AOUT',
            'SEPTEMBRE',
            'OCTOBRE',
            'NOVEMBRE',
            'DECEMBRE',
        ];
        return months[NbreMois];
    };

    changeTab() {
        this.gestioEtatService.checked = this.recensementControle.value;
        console.log(this.gestioEtatService.checked,'checked');

        if (this.recensementControle.value === 'Jour') {
            this.getRechercheJournaliere();
        }

        if (this.recensementControle.value === 'Semaine') {
            this.getrechercherByWeek();
        }

        if (this.recensementControle.value === 'Mois') {
            this.getrechercherByMonth();
        }

        if (this.recensementControle.value === 'Annee') {
            this.getrechercherByYear();
        }

    }

    exportPdf() {
        // Determination de la période suivant le type //
        var PeriodeEtat = null;
        switch (this.gestioEtatService.checked) {
            case 'Jour':
                var DateJour = new Date(this.SearchJourform.value['dateJour']);
                PeriodeEtat = [  
                    // Grand Titre
                    {  
                    alignment:'center',
                    columns :[
                        {text : 'RAPPORT DE PRESENCE DU' + ' ' + moment(DateJour).format('DD/MM/YYYY'),style:'subheader'} 
                    ]
                    },
                ];
                break;

            case 'Semaine':
                var date_debut = new Date(this.SearchSemaineform.value['dateDebut']);
                var date_fin = new Date(this.SearchSemaineform.value['dateFin']);   
                PeriodeEtat = [  
                    // Grand Titre
                    {  
                    alignment:'center',
                    columns :[{text : 'RAPPORT DE PRESENCE DU' + ' ' + moment(date_debut).format('DD/MM/YYYY') + ' au ' + ' ' + moment(date_fin).format('DD/MM/YYYY'),style:'subheader',} ]
                    },
                ];
                break;

            case 'Mois':
                PeriodeEtat = [  
                    // Grand Titre
                    {  
                    alignment:'center',
                    columns :[{text : 'RAPPORT DE PRESENCE DU MOIS DE' + ' ' + this.moisCompletFrench(this.SearchMoisform.value['mois'] - 1 ) + ' ' + this.SearchMoisform.value['annee'],style:'subheader',} ]
                    },
                ];
                break;

            case 'Annee':
                PeriodeEtat = [{
                    alignment:'center',
                    columns :[{text : 'RAPPORT DE PRESENCE DE L\'ANNEE ' + ' ' + this.SearchAnneeform.value['annee'],style:'subheader',} ] 
                    }
                ];
                break;

            default:
                PeriodeEtat = null;
                break;
        }
              
 
        let rows: any[] = [
            [
                {text: 'Nom', style: 'tableHeader'},
                {text: 'Prénom ', style: 'tableHeader'}, 
                {text: 'Date', style: 'tableHeader'},
                {text: 'Heure d\'arrivée', style: 'tableHeader'},
                {text: 'Heure de départ', style: 'tableHeader'},
                {text: 'Statut', style: 'tableHeader'},

            ],
        ];
        for (let i = 0; i < this.assiduiteExportation.length; i++) {
            const element = this.assiduiteExportation[i];

            let ident = [
                { text : element?.utilisateur.nom},
                { text : element?.utilisateur.prenom},
                { text: moment(element?.dateCreation).format('DD/MM/YYYY') },
                { text: element?.heure_arrive },
                { text: element?.heure_depart },
                { text: element?.statut.libelle },
                
            ];

            rows.push(ident);
        }

        const documentDefinition: TDocumentDefinitions = {
              pageOrientation: 'portrait',
            // header: [{ text: 'GESTION DES RENDEZ-VOUS', style: 'entete' }],

            content: [

                 // En tête
                {
                    
                    columns:[
                                    
                            {text :'FICHE D\'ASSIDUITE',style :'header'},
                            // {
                            //    image: 'sampleImage.jpg',
                            //    width: 150,
                            //    alignment: 'right',
                            // },
                            ]
                },
                PeriodeEtat,
                {
                    style: 'table',
                    table: {
                        headerRows: 1,
                        body: rows,
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return i === 0 || i === node.table.body.length
                                ? 1
                                : 1;
                        },
                        vLineWidth: function (i, node) {
                            return i === 0 || i === node.table.widths.length
                                ? 1
                                : 1;
                        },
                        hLineColor: function (i, node) {
                            return i === 0 || i === node.table.body.length
                                ? 'gray'
                                : 'gray';
                        },
                        vLineColor: function (i, node) {
                            return i === 0 || i === node.table.widths.length
                                ? 'gray'
                                : 'gray';
                        },
                        fillColor: function (rowIndex, node, columnIndex) {
                            return rowIndex === 0 ? '#CCCCCC' : null;
                        },
                    },
                },
            ],
           	// Css
               styles: {
                header:
                {
                    fontSize: 13,
                    bold: true,
                },
                
                headers:
                {
                    fontSize: 8,
                    bold: true,
                    alignment: 'right',
                },
                subheader: 
                {
                    fontSize: 15,
                    bold: true,
                    alignment: 'center',
                    margin: [20, 20, 20, 20],
                    decoration: 'underline',
                    lineHeight: 1.5,
                },
                
                tableHeader:
                {
                    fillcolor:'#CCCCCC',
                },
                
                table:
                {
                    margin: [20, 20, 20, 20],
                    fontSize: 15,
                    alignment:'center',
                },
                
                statut:
                {
                    margin: [20, 20, 20, 20],
                },
                
            },
        };
        pdfMake.createPdf(documentDefinition).open();
    }


    exportExcel(): void {
        const exportData = this.assiduiteExportation.map((element) => {
            return {
                Nom: element?.utilisateur.nom,
                Prenom: element?.utilisateur.prenom,
                Date: moment(element?.dateCreation).format('DD/MM/YYYY'),
                Heure_arrivee: element?.heure_arrive ,
                Heure_depart: element?.heure_depart,
                Statut: element?.statut.libelle,
            };
        });
        /* generate worksheet */
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }
}

