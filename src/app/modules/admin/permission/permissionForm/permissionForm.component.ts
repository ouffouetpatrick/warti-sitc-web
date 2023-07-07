import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Permission } from 'app/interfaces/permission/permission';
import { TypePermission } from 'app/interfaces/typePermission/typePermission';
import { TypePermissionService } from 'app/services/parametre/type-permission/type-permission.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionService } from 'app/services/permission/permission.service';
import { UserService } from 'app/core/user/user.service';
import { Utilisateur } from 'app/interfaces/administration/utilisateur';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'permissionForm',
    templateUrl  : './permissionForm.component.html',
    styleUrls    : ['./permissionForm.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PermissionFormComponent implements OnInit
{
    permissionForm : FormGroup;
    listeTypePermissions : TypePermission [] = [];
    user: Utilisateur;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    currentDate : any = new Date();

    /**
     * Constructor
     */
    constructor(
        private matDialogRef : MatDialogRef<PermissionFormComponent>,
        private _formBuilder : FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: { permission: Permission },
        private typePermissionService : TypePermissionService,
        private _snackBar : MatSnackBar,
        private permissionService : PermissionService,
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
      // console.log(this.user,'this._userService.user$');
      
      this.generateForm();
      this.getTypePermission();

    }

    
    generateForm(){
        // Create the form
        this.permissionForm = this._formBuilder.group({
            id: [this.data.permission ? this.data.permission.id : null],
            typePermission : [this.data.permission ? this.data.permission.typePermission: ''],
            detail  : [this.data.permission ? this.data.permission.detail : '',],
            date_debut   : [this.data.permission ? this.data.permission.date_debut : '', [Validators.required]],
            date_fin     : [this.data.permission ? this.data.permission.date_fin : '', [Validators.required]],
            utilisateur  : [this.user.id],
            empty1: [null],
            empty2: [null],
            empty3: [null],
            geler: [0],
            dateCreation: [new Date().toISOString()],
            idusrcreation   : [1],//id de l'utilisateur connecté
        });
    }


    // Fonction de sauvergarde et de modification
    save(): void {
        // this.inProgress = true; // Démarre le loader
        const permission = {
          ...this.permissionForm.value,
          // typePermission: this.typePermission.value,
        };
        console.log(permission,"permission");
        // const send = this._visiteService.ValidationPermission(statutPermission);
        // const send = this.permissionService.AjouterPermission(permission);
        const send = (!this.permissionForm.value.id) ? this.permissionService.AjouterPermission(permission) : this.permissionService.update(this.permissionForm.value);
        
        send.subscribe(async (result) => {
          // this.inProgress = false; // stop le loader
          console.log(result, 'result ajout permission');
          
          if (result) {
            this._snackBar.open('Permission enregistrée avec succès', 'Fermer', { duration: 2000, panelClass: ['success-snackbar'] });
            this.matDialogRef.close({ status: 'save' });
    
          } else {
            this._snackBar.open('Impossible d\'enregistrée la permission', 'Fermer', { duration: 2000, panelClass: ['warning-snackbar'] });
          }
        },
          (err) => {
            this._snackBar.open('Erreur d\'enregistrement  permission', 'Fermer', { duration: 2000, panelClass: ['error-snackbar'] });
          });
    }
    

    close(): void {
        // Close the dialog
        this.matDialogRef.close();
    }

    

    // Affichage de la liste des types de permision
    getTypePermission() {
        // this.inProgress = true; // Démarre le loader
        const getTypePermission = this.typePermissionService.getListeTypepermission();
    
        getTypePermission.subscribe((result) => {
            this.listeTypePermissions = result;
            console.log(this.listeTypePermissions, 'typepermission')
        });
      }

      comparer(o1: any, o2: any): boolean {
        // if possible compare by object's name, and not by reference.
        return o1.id == o2.id;
    }
}
