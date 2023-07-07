import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Permission } from 'app/interfaces/permission/permission';
import { TypePermission } from 'app/interfaces/typePermission/typePermission';
import { TypePermissionService } from 'app/services/parametre/type-permission/type-permission.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionService } from 'app/services/permission/permission.service';
import { Motif } from 'app/interfaces/motif/motif';
import { MotifService } from 'app/services/motif/motif.service';
import { UserService } from 'app/core/user/user.service';
import { Utilisateur } from 'app/interfaces/administration/utilisateur';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'rejeterForm',
    templateUrl  : './rejeterForm.component.html',
    styleUrls    : ['./rejeterForm.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RejeterFormComponent implements OnInit
{
    permissionForm : FormGroup;
    listeMotif : Motif [] = [];
    motif = new FormControl("", Validators.required);
    rejeterForm: FormGroup;
    permissionService: PermissionService;
    inProgress: boolean;
    user: Utilisateur;
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        private matDialogRef : MatDialogRef<RejeterFormComponent>,
        private _formBuilder : FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {permission: Permission },
        // private typePermissionService : TypePermissionService,
        private permisiosnService : PermissionService ,
        private _snackBar : MatSnackBar,
        private motifService : MotifService,
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
        this.getMotif()
        this.generateForm();
        // this.getListeMotif();
    }

    generateForm(){
        // Create the form
        this.rejeterForm = this._formBuilder.group({
            id: [this.data.permission ? this.data.permission.id : null],
            detail  : [this.data.permission ? this.data.permission.detail : '',],
            date_debut   : [this.data.permission ? this.data.permission.date_debut : '', [Validators.required]],
            date_fin     : [this.data.permission ? this.data.permission.date_fin : '', [Validators.required]],
            utilisateur  : [this.data.permission ? this.data.permission.utilisateur : '',],
            typePermission  : [this.data.permission ? this.data.permission.typePermission : '',],
            empty1: [null],
            empty2: [null],
            empty3: [null],
            // actif: [0],
            geler: [0],
            dateCreation: [new Date().toISOString()],
            idusrcreation   : [1],
            //  permission: [this.data.permission.id],
        });
        
    }

    saveRejet(): void {
        //  this.inProgress = true; // Démarre le loader
        const permision: Permission = {
          ...this.rejeterForm.value,
          motif: this.motif.value,
        };
        // const rejetPermission = {
        //   ...this.rejeterForm.value,
        // };
        // const send = this._visiteService.ValidationPermission(statutPermission);
         const send = this.permisiosnService.RejeterPermission(permision);
        // const send = (!this.permissionForm.value.id) ? this.permissionService.AjouterPermission(permission) : this.permissionService.update(this.permissionForm.value);
        
        send.subscribe(async (result) => {
          // this.inProgress = false; // stop le loader
          
          if (result) {
            this._snackBar.open('Permission rejeter avec succès', 'Fermer', { duration: 2000, panelClass: ['success-snackbar'] });
            this.matDialogRef.close({ status: 'save' });
    
          } else {
            this._snackBar.open('Impossible de rejeter cette permission', 'Fermer', { duration: 2000, panelClass: ['warning-snackbar'] });
          }
        },
          (err) => {
            this._snackBar.open('Erreur de rejet  permission', 'Fermer', { duration: 2000, panelClass: ['error-snackbar'] });
          });
    }
    

    close(): void {
        // Close the dialog
        this.matDialogRef.close();
    }


    // Affichage de la liste des types de permision
    getMotif() {
        this.inProgress = true; // Démarre le loader
        const getListeMotif = this.motifService.getListeMotif();
    
        getListeMotif.subscribe((result) => {
            this.listeMotif = result;
             console.log(this.listeMotif, 'motif')
        });
      }

}
