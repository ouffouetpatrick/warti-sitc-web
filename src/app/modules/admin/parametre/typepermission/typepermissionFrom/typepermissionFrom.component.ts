import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TypePermission } from 'app/interfaces/typePermission/typePermission';
import { TypePermissionService } from 'app/services/parametre/type-permission/type-permission.service';

@Component({
    selector     : 'typepermissionFrom',
    templateUrl  : './typepermissionFrom.component.html',
    styleUrls    : ['./typepermissionFrom.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TypepermissionFromComponent
{
    typepermissionFrom : FormGroup
    /**
     * Constructor
     */
    constructor(
        private _formBuilder : FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: { typePermission: TypePermission },
        private typepermissionService : TypePermissionService,
        private _matDialog : MatDialog,
        private matDialogRef : MatDialogRef<TypepermissionFromComponent>,
        private _snackBar : MatSnackBar
    )
    {
    }



    
    ngOnInit(): void {
        this.generateForm();
        
    }


    
    openDialogtypepermissionFrom(typePermission?: any): void {
        const dialogRef = this._matDialog.open(TypepermissionFromComponent, {
            data: {
                typePermission: typePermission ? typePermission : undefined,
            },
        });
    
        // // pour recuperer les donnée d'une ligne dans le modal
        // dialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //         this.getTypepermissoin();
        //     }
        // });
        }

        close(): void {
            // Close the dialog
            this.matDialogRef.close();
        }


        generateForm(){
            // Create the form
            this.typepermissionFrom = this._formBuilder.group({
                id: [this.data.typePermission ? this.data.typePermission.id : null],
                libelle  : [this.data.typePermission ? this.data.typePermission.libelle : '',[Validators.required]],
                // date_debut   : [this.data.typepermission ? this.data.typepermission.date_debut : '', [Validators.required]],
                // date_fin     : [this.data.typepermission ? this.data.typepermission.date_fin : '', [Validators.required]],
                // utilisateur  : [1],
                empty1: [null],
                empty2: [null],
                empty3: [null],
                geler: [0],
                dateCreation: [new Date().toISOString()],
                idusrcreation   : [1],//id de l'utilisateur connecté
            });
        }


        
        save(): void {
            // this.inProgress = true; // Démarre le loader
            const typepermission = {
              ...this.typepermissionFrom.value,
              
            };
            // const send = this._visiteService.ValidationPermission(statutPermission);
            //const send = this.typepermissionService.AjouterTypepermission(typepermission);
             const send = (!this.typepermissionFrom.value.id) ? this.typepermissionService.AjouterTypepermission(typepermission) : this.typepermissionService.update(this.typepermissionFrom.value);
        
            send.subscribe(async (result) => {
              // this.inProgress = false; // stop le loader
              console.log(result, 'result ajout typepermission');
              
              if (result) {
                this._snackBar.open('Motif enregistrée avec succès', 'Fermer', { duration: 2000, panelClass: ['success-snackbar'] });
                this.matDialogRef.close({ status: 'save' });
        
              } else {
                console.log(result, 'result ajout typepermission');
                this._snackBar.open('Impossible d\'enregistrée le typepermission', 'Fermer', { duration: 2000, panelClass: ['warning-snackbar'] });
              }
            },
              (err) => {
                this._snackBar.open('Erreur d\'enregistrement  typepermission', 'Fermer', { duration: 2000, panelClass: ['error-snackbar'] });
              });
        }
}
