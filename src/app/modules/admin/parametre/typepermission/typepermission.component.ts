import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'app/constants';
import { Pagination } from 'app/interfaces/utils/Pagination';
import { TypePermissionService } from 'app/services/parametre/type-permission/type-permission.service';
import { TypepermissionFromComponent } from './typepermissionFrom/typepermissionFrom.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector     : 'typepermission',
    templateUrl  : './typepermission.component.html',
    styleUrls    : ['./typepermission.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TypepermissionComponent
{
    isLoading: boolean = false;
    showPagination: number = 0;
    isShow : number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('paginationTypepermission') paginationTypepermission: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    page = { pageSize: PAGE_SIZE, pageSizeOptions: PAGE_SIZE_OPTIONS };
    // private _unsubscribeAll: Subject<any> = new Subject<any>();
    pagination: Pagination = { page: 1, size: 10, startIndex: 0 };
    dataSourceTypepermission = new MatTableDataSource<any>([]);
    displayedColumns: string[] = [
        'typepermission',
        'datecreation',
        'Action',
    ];
    validatedeletForm : FormGroup ;
    /**
     * Constructor
     */
    constructor(
        private typePermissionService : TypePermissionService,
        private _matDialog : MatDialog,
         private _formBuilder: FormBuilder,
         private _fuseConfirmationService: FuseConfirmationService,
      
    )
    {
    }


    ngOnInit(): void {
        this.getTypepermissoin();
        this.generateForm()
        
    }

    getTypepermissoin() {
        this.isLoading = true; // Démarre le loader
        const getTypepermissoin = this.typePermissionService.getListeTypepermission();
        getTypepermissoin.subscribe(result => {
            console.log(result, 'attente');
            
            this.isLoading = false; // stop le loader
            this.dataSourceTypepermission = new MatTableDataSource<any>(result);
            this.dataSourceTypepermission.paginator = this.paginationTypepermission;
            console.log(this.paginationTypepermission, 'paginationTypepermission');
            this.dataSourceTypepermission.sort = this.sort;
            this.pagination.page = 1;
            this.pagination.startIndex = 0;
            this.pagination.length = result.length;
        });
    }

    
    pageChanged(event): void {
        const pageIndex = event.pageIndex;
        const previousIndex = event.previousPageIndex;
        this.pagination.startIndex = pageIndex;
        this.pagination.page = pageIndex + 1;
        this.pagination.size = event.pageSize;
    }


    openDialogtypepermissionFrom(typePermission?: any): void {
        const dialogRef = this._matDialog.open(TypepermissionFromComponent, {
            data: {
                typePermission: typePermission ? typePermission : undefined,
            },
        });
    
        // // pour recuperer les donnée d'une ligne dans le modal
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getTypepermissoin();
            }
        });
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

SuppimerTypePermission(motif?: any): void {
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
                this.typePermissionService.SuppirmerTypepermission(motif);
            validateReq.subscribe(() => {
                this.getTypepermissoin()
                
            });
        }
    });
}

}
