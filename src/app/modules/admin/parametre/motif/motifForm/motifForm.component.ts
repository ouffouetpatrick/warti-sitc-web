import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Motif } from 'app/interfaces/motif/motif';
import { MotifService } from 'app/services/motif/motif.service';

@Component({
    selector     : 'motifForm',
    templateUrl  : './motifForm.component.html',
    styleUrls    : ['./motifForm.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MotifFormComponent
{
    
    motifForm : FormGroup
    /**
     * Constructor
     */
    constructor(
        private matDialogRef : MatDialogRef<MotifFormComponent>,
        private _formBuilder : FormBuilder,
        private _matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: { motif: Motif },
        private motifService : MotifService,
        private _snackBar : MatSnackBar
    )
    {
    }
    ngOnInit(): void {
        this.generateForm();
        
    }

      // fonction ouvrir le formulaire pour enregistrer une motif
      openDialogmotifForm(motif?: any): void {
        const dialogRef = this._matDialog.open(MotifFormComponent, {
            data: {
                motif: motif ? motif : undefined,
            },
        });
    
        // pour recuperer les donnée d'une ligne dans le modal
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // this.getMotif();
            }
        });
        }

        close(): void {
            // Close the dialog
            this.matDialogRef.close();
        }


        generateForm(){
            // Create the form
            this.motifForm = this._formBuilder.group({
                id: [this.data.motif ? this.data.motif.id : null],
                libelle  : [this.data.motif ? this.data.motif.libelle : '',[Validators.required]],
                // date_debut   : [this.data.motif ? this.data.motif.date_debut : '', [Validators.required]],
                // date_fin     : [this.data.motif ? this.data.motif.date_fin : '', [Validators.required]],
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
            const motif = {
              ...this.motifForm.value,
              
            };
            // const send = this._visiteService.ValidationPermission(statutPermission);
            // const send = this.motifService.AjouterMotif(motif);
            const send = (!this.motifForm.value.id) ? this.motifService.AjouterMotif(motif) : this.motifService.update(this.motifForm.value);
        
            send.subscribe(async (result) => {
              // this.inProgress = false; // stop le loader
              console.log(result, 'result ajout motif');
              
              if (result) {
                this._snackBar.open('Motif enregistrée avec succès', 'Fermer', { duration: 2000, panelClass: ['success-snackbar'] });
                this.matDialogRef.close({ status: 'save' });
        
              } else {
                console.log(result, 'result ajout motif');
                this._snackBar.open('Impossible d\'enregistrée le motif', 'Fermer', { duration: 2000, panelClass: ['warning-snackbar'] });
              }
            },
              (err) => {
                this._snackBar.open('Erreur d\'enregistrement  motif', 'Fermer', { duration: 2000, panelClass: ['error-snackbar'] });
              });
        }



        
}
