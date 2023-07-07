import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'app/constants';
import { Pagination } from 'app/interfaces/utils/Pagination';
import { items } from 'app/mock-api/apps/file-manager/data';
import { PermissionService } from 'app/services/permission/permission.service';
import { Subject, takeUntil } from 'rxjs';
import { PermissionFormComponent } from './permissionForm/permissionForm.component';
import { Permission } from 'app/interfaces/permission/permission';
import { RejeterFormComponent } from './rejeterForm/rejeterForm.component';
import { UserService } from 'app/core/user/user.service';
import { Utilisateur } from 'app/interfaces/administration/utilisateur';

@Component({
    selector     : 'permission',
    templateUrl  : './permission.component.html',
    styleUrls    : ['./permission.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PermissionComponent implements OnInit
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    user: Utilisateur;

    isLoading: boolean = false;
    dataSourceAttente = new MatTableDataSource<any>([]);
    dataSourceAttenteAll = new MatTableDataSource<any>([]);
    dataSourceValide = new MatTableDataSource<any>([]);
    dataSourceRejete = new MatTableDataSource<any>([]);
    showPagination: number = 0;
    isShow : number;
    validaterejetForm : FormGroup ;
    validateForm : FormGroup ;
    permission: Permission;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('paginationAttente') paginationAttente: MatPaginator;
    @ViewChild('paginationValide') paginationValide: MatPaginator;
    @ViewChild('paginationRejete') paginationRejete: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    page = { pageSize: PAGE_SIZE, pageSizeOptions: PAGE_SIZE_OPTIONS };
    // private _unsubscribeAll: Subject<any> = new Subject<any>();
    pagination: Pagination = { page: 1, size: 10, startIndex: 0 };
    displayedColumns: string[] = [
        'typePermission',
        'utilisateur',
        'detail',
        'dateDebut',
        'dateFin',
        'statut',
        'datecreation',
        'Action',
    ];
    displayedValider:string[] = [
        'typePermission',
        'utilisateur',
        'detail',
        'dateDebut',
        'dateFin',
        'statut',
        'datecreation',
    ];
    dataSourceRejeter:string[] = [
        'typePermission',
        'utilisateur',
        'detail',
        'dateDebut',
        'dateFin',
        'statut',
        'motif',
        'datecreation',
    ];


    constructor(
        private permissionService: PermissionService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _userService : UserService ,
        
    )
    {
    }

    ngOnInit(): void {
        this._userService.user$
        .pipe((takeUntil(this._unsubscribeAll)))
        .subscribe((user: any) => {
          this.user = user;               
      });
      console.log(this.user,'user');
      
      if (this.user.utilisateurProfil[0].profil?.id==3) {
        this.getPermissionAttente();
        this.getPermissionValide();
        this.getPermissionRejete();
      }else{
        this.getPermissionAttenteAll();
        this.getPermissionValideAll();
        this.getListePermissionRejeterAll()
    }
        
     
        this.generateForm();
        
        // this.generateRejeteForm()
    }


// Fonction des Permission en attente en fonction de l'utilisateur connecté
    getPermissionAttente() {
        this.isLoading = true; // Démarre le loader
        const getPermissionAttente = this.permissionService.getListePermissionAttente();
        getPermissionAttente.subscribe(result => {
            console.log(result, 'attente');
            
            this.isLoading = false; // stop le loader
            this.dataSourceAttente = new MatTableDataSource<any>(result);
            this.dataSourceAttente.paginator = this.paginationAttente;
            console.log(this.paginationAttente, 'paginationAttente');
            this.dataSourceAttente.sort = this.sort;
            this.pagination.page = 1;
            this.pagination.startIndex = 0;
            this.pagination.length = result.length;
        });
    }

// Fonction des Permission en attente
getPermissionAttenteAll() {
    this.isLoading = true; // Démarre le loader
    const getPermissionAttente = this.permissionService.getListePermissionAttenteAll();
    getPermissionAttente.subscribe(result => {
        console.log(result, 'attenteAll');
        
        this.isLoading = false; // stop le loader
        this.dataSourceAttente = new MatTableDataSource<any>(result);
        this.dataSourceAttente.paginator = this.paginationAttente;
        console.log(this.paginationAttente, 'paginationAttenteAll');
        this.dataSourceAttente.sort = this.sort;
        this.pagination.page = 1;
        this.pagination.startIndex = 0;
        this.pagination.length = result.length;
    });
}


        
// Fonction des Permission Validée
getPermissionValide() {
    this.isLoading = true; // Démarre le loader
    const getPermissionValide = this.permissionService.getListePermissionValide();
    getPermissionValide.subscribe(result => {
        console.log(result, 'valide');
        
        this.isLoading = false; // stop le loader
        this.dataSourceValide = new MatTableDataSource<any>(result);
        this.dataSourceValide.paginator = this.paginationValide;
        console.log(this.paginationValide, 'paginationValide');
        this.dataSourceValide.sort = this.sort;
        this.pagination.page = 1;
        this.pagination.startIndex = 0;
        this.pagination.length = result.length;
    });
}

getPermissionValideAll() {
    this.isLoading = true; // Démarre le loader
    const getPermissionValide = this.permissionService.getListePermissionValideAll();
    getPermissionValide.subscribe(result => {
        console.log(result, 'valide');
        
        this.isLoading = false; // stop le loader
        this.dataSourceValide = new MatTableDataSource<any>(result);
        this.dataSourceValide.paginator = this.paginationValide;
        console.log(this.paginationValide, 'paginationValide');
        this.dataSourceValide.sort = this.sort;
        this.pagination.page = 1;
        this.pagination.startIndex = 0;
        this.pagination.length = result.length;
    });
}



// Fonction des Permission Rejetée
getPermissionRejete() {
    this.isLoading = true; // Démarre le loader
    const getPermissionRejete = this.permissionService.getListePermissionRejeter();
    getPermissionRejete.subscribe(result => {
        console.log(result, 'rejete');
        
        this.isLoading = false; // stop le loader
        this.dataSourceRejete = new MatTableDataSource<any>(result);
        this.dataSourceRejete.paginator = this.paginationRejete;
        console.log(this.paginationRejete, 'paginationRejete');
        this.dataSourceRejete.sort = this.sort;
        this.pagination.page = 1;
        this.pagination.startIndex = 0;
        this.pagination.length = result.length;
    });
}
// Fonction des Permission Rejetée de tout les utilisateurs
getListePermissionRejeterAll() {
    this.isLoading = true; // Démarre le loader
    const getPermissionRejete = this.permissionService.getListePermissionRejeterAll();
    getPermissionRejete.subscribe(result => {
        // console.log(result, 'rejete');
        
        this.isLoading = false; // stop le loader
        this.dataSourceRejete = new MatTableDataSource<any>(result);
        this.dataSourceRejete.paginator = this.paginationRejete;
        // console.log(this.paginationRejete, 'paginationRejete');
        this.dataSourceRejete.sort = this.sort;
        this.pagination.page = 1;
        this.pagination.startIndex = 0;
        this.pagination.length = result.length;
    });
}



//Generateur de popup de Validation
generateForm() {
    this.validateForm = this._formBuilder.group({
        title: 'Validation de la permission',
        message:
            'Êtes-vous sûr de vouloir valider cette permission? <span class="font-medium">Cette action ne peut pas être annulée!</span>',
        icon: this._formBuilder.group({
            show: true,
            name: 'heroicons_outline:check',
            color: 'success',
        }),
        actions: this._formBuilder.group({
            confirm: this._formBuilder.group({
                show: true,
                label: 'Valider',
                color: 'primary',
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
//Valider une permission 

ValiderPermission(permission?: any): void {
    // Open the dialog and save the reference of it
    
    const dialogRef = this._fuseConfirmationService.open(
        this.validateForm.value
    );
    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
        if (result == 'confirmed') {
            //Crée une constante qui sera envoyé dans le back avec l'id
            //de la permission
            const statutPermission: any = {
                actif: 0,
                geler: 0,
                dateCreation: new Date().toISOString(),
                idusrcreation: permission.utilisateur.id,
                permission: permission.id,
            };
            const validateReq = this.permissionService.ValiderPermission(statutPermission);
            validateReq.subscribe(() => {
                this.getPermissionAttenteAll()
                
            });
        }
    });
}

//Rejeter une permission
// RejeterPermission(permission?: any): void {
//     // Open the dialog and save the reference of it
//     const dialogRef = this._fuseConfirmationService.open(
//         this.validaterejetForm.value
//     );
//     // Subscribe to afterClosed from the dialog reference
//     dialogRef.afterClosed().subscribe((result) => {
//         if (result == 'confirmed') {
//             //Crée une constante qui sera envoyé dans le back avec l'id
//             //de la permission
//             const statutPermission: any = {
//                 actif: 0,
//                 motif:null ,
//                 geler: 0,
//                 dateCreation: new Date().toISOString(),
//                 idusrcreation: 1,
//                 permission: permission.id,
//             };
//             const validateReq =
//                 this.permissionService.RejeterPermission(statutPermission);
//             validateReq.subscribe(() => {
//                 this.getPermissionAttente()
                
//             });
//         }
//     });
// }

//Generateur de popup de rejet
// generateRejeteForm() {
//     this.validaterejetForm = this._formBuilder.group({
//         title: 'Rejeter de la permission',
//         message:
//             'Êtes-vous sûr de vouloir rejeter cette permission? <span class="font-medium">Cette action ne peut pas être annulée!</span>',
//         icon: this._formBuilder.group({
//             show: true,
//             name: 'heroicons_outline:exclamation',
//             color: 'warning',
//         }),
//         actions: this._formBuilder.group({
//             confirm: this._formBuilder.group({
//                 show: true,
//                 label: 'Valider',
//                 color: 'primary',
//             }),
//             cancel: this._formBuilder.group({
//                 show: true,
//                 label: 'Annuler',
//                 color:'danger',
//             }),
//         }),
//         dismissible: true,
//     });
// }
//PoPoP de suppression

// deleteSelectedProduct(): void
// {
//     // Open the confirmation dialog
//     const confirmation = this._fuseConfirmationService.open({
//         title  : 'Rejeter la permission',
//         message: 'Êtes vous vraiment sûr de vouloir rejeter cette permission ?',
//         actions: {
//             confirm: {
//                 label: 'Rejeter'
//             }
//         }
    
//     });
// }
//PoPoP de validation

// ValidateSelectedProduct(): void
// {
//     // Open the confirmation dialog
//     const confirmation = this._fuseConfirmationService.open({
//         title  : 'Valider la permission',
//         message: 'Êtes vous vraiment sûr de vouloir valider cette permission ?',
//         actions: {
//             confirm: {
//                 label: 'Valider',
//                 color:'primary'
//             }
//         }
        
//     });

// }
//


   // fonction ouvrir le formulaire pour enregistrer une permission
   openDialogPermissionForm(permission?: any): void {
    const dialogRef = this._matDialog.open(PermissionFormComponent, {
        data: {
            permission: permission ? permission : undefined,
        },
    });

    // pour recuperer les donnée d'une ligne dans le modal
    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.getPermissionAttente();
        }
    });
    }

      // fonction ouvrir le formulaire pour enregistrer une permission
   openDialogRejeterForm(permission?: any): void {
    const dialogRef = this._matDialog.open(RejeterFormComponent, {
        data: {
            permission: permission ? permission : undefined,
        },
    });

    // pour recuperer les donnée d'une ligne dans le modal
    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.getPermissionAttenteAll();
        }
    });
    }

    onTabsChange(event): void {
        this.showPagination = event.index;
        console.log(this.showPagination, 'showPagination');

        if (this.user.utilisateurProfil[0].profil?.id==3) {
            this.getPermissionAttente();
            this.getPermissionValide();
            this.getPermissionRejete();
          }else{
            this.getPermissionAttenteAll();
            this.getPermissionValideAll();
            this.getListePermissionRejeterAll()
        }
    }
    

    pageChanged(event): void {
        const pageIndex = event.pageIndex;
        const previousIndex = event.previousPageIndex;
        this.pagination.startIndex = pageIndex;
        this.pagination.page = pageIndex + 1;
        this.pagination.size = event.pageSize;
    }




// Filtrer les visites
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceAttente.filter = filterValue.trim().toLowerCase();
        this.dataSourceValide.filter = filterValue.trim().toLowerCase();
        this.dataSourceRejete.filter = filterValue.trim().toLowerCase();
      
        if (this.dataSourceAttente.paginator) {
            this.dataSourceAttente.paginator.firstPage();
        } else if (this.dataSourceValide.paginator) {
            this.dataSourceValide.paginator.firstPage();
        } else if (this.dataSourceRejete.paginator) {
            this.dataSourceRejete.paginator.firstPage();
        } 
    }


}

