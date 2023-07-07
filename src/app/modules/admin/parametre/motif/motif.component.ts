// import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, Inject, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'app/constants';
import { Pagination } from 'app/interfaces/utils/Pagination';
import { MotifService } from 'app/services/motif/motif.service';
// import { MotifService } from 'app/services/motif/motif.service';
import { Subject } from 'rxjs';
// import { MotifFormComponent } from './motifForm/motifForm.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Motif } from 'app/interfaces/motif/motif';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotifFormComponent } from './motifForm/motifForm.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector     : 'motif',
    templateUrl  : './motif.component.html',
    styleUrls    : ['./motif.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MotifComponent implements OnInit
{
    isLoading: boolean = false;
    showPagination: number = 0;
    isShow : number;
    dataSourceMotif = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('paginationMotif') paginationMotif: MatPaginator;
    // @ViewChild('paginationValide') paginationValide: MatPaginator;
    // @ViewChild('paginationRejete') paginationRejete: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    page = { pageSize: PAGE_SIZE, pageSizeOptions: PAGE_SIZE_OPTIONS };
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    pagination: Pagination = { page: 1, size: 10, startIndex: 0 };
    motifForm: FormGroup;
    motif : Motif ;
    displayedColumns: string[] = [
        'motif',
        'datecreation',
        'Action',
    ];
    validatedeletForm : FormGroup ;
    
    // paginationMotif: MatPaginator;
    /**
     * Constructor
     */
    constructor(
        private motifService: MotifService,
        private _matDialog : MatDialog,
         private _formBuilder: FormBuilder,
         private _fuseConfirmationService: FuseConfirmationService,
        // private motifService :MotifService,
        // @Inject(MAT_DIALOG_DATA) public data: { motif: Motif },
        // private matDialogRef : MatDialogRef<MotifFormComponent>,
        // private _snackBar : MatSnackBar,
        
    )
    {
        
    }
    
    ngOnInit(): void {
        this.getMotif();
        // this.getMotifValide();
        // this.getMotifRejete();
        this.generateForm()
    }


  // Generateur de popup
generateForm() {
    this.validatedeletForm = this._formBuilder.group({
        title: 'Supprimer un motif',
        message:
            'Êtes-vous sûr de vouloir supprimer ce motif? <span class="font-medium">Cette action ne peut pas être annulée!</span>',
        icon: this._formBuilder.group({
            show: true,
            name: 'heroicons_outline:exclamation-circle',
            color: 'warn',
        }),
        actions: this._formBuilder.group({
            confirm: this._formBuilder.group({
                show: true,
                label: 'Supprimer',
                color: 'warn',
            }),
            cancel: this._formBuilder.group({
                show: true,
                label: 'Annuler',
                color:'danger',
            }),
        }),
        dismissible: true,
    });
}

// Fonction de suppresion (mettre le geler a 1)

SuppimerMotif(motif?: any): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(
        this.validatedeletForm.value
    );
    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
        if (result == 'confirmed') {
            //Crée une constante qui sera envoyé dans le back avec l'id
            //de la permission
            // const motif: any = {
            //     actif: 0,
            //     geler: 1,
            //     dateCreation: new Date().toISOString(),
            //     idusrcreation: 1,
            //     // motif : motif.id,
            // };
            const validateReq =
                this.motifService.SupprimerMotif(motif);
            validateReq.subscribe(() => {
                this.getMotif()
                
            });
        }
    });
}



    // Fonction d'affichage des Motif 
    getMotif() {
        this.isLoading = true; // Démarre le loader
        const getMotif = this.motifService.getListeMotif();
        getMotif.subscribe(result => {
            console.log(result, 'attente');
            
            this.isLoading = false; // stop le loader
            this.dataSourceMotif = new MatTableDataSource<any>(result);
            this.dataSourceMotif.paginator = this.paginationMotif;
            console.log(this.paginationMotif, 'paginationMotif');
            this.dataSourceMotif.sort = this.sort;
            this.pagination.page = 1;
            this.pagination.startIndex = 0;
            this.pagination.length = result.length;
        });
    }

    // onTabsChange(event): void {
    //     this.showPagination = event.index;
    //     console.log(this.showPagination, 'nbr');
        
    //     this.getListeMotif();
    //     // this.getPermissionValide();
    //     // this.getPermissionRejete();
    //     // this.getPermissionAll();
    // }
    

    pageChanged(event): void {
        const pageIndex = event.pageIndex;
        const previousIndex = event.previousPageIndex;
        this.pagination.startIndex = pageIndex;
        this.pagination.page = pageIndex + 1;
        this.pagination.size = event.pageSize;
    }




     // fonction ouvrir le formulaire pour enregistrer une motif
     openDialogmotifForm(motif?: any): void {
    const dialogRef = this._matDialog.open(MotifFormComponent, {
        data: {
            motif: motif ? motif : undefined,
        },
    });

    // // pour recuperer les donnée d'une ligne dans le modal
    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.getMotif();
        }
    });
    }




}
