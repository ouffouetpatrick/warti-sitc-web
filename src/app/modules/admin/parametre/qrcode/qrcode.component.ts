import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Qrcode } from 'app/interfaces/qrcode/qrcode';
import { QrcodeService } from 'app/services/qrcode/qrcode.service';
import * as CryptoJS from 'crypto-js';




@Component({
    selector     : 'qrcode',
    templateUrl  : './qrcode.component.html',
    styleUrls    : ['./qrcode.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QrcodeComponent implements OnInit
{
    isLoading: boolean = false;
    qrCodeValue: any;
    encryptedValue: string;
    qrcodeForm: FormGroup;
    
    constructor(
        private qrcodeService: QrcodeService,
        private _formBuilder: FormBuilder,
    ){}

    ngOnInit(): void {
        // Create the form
        this.qrcodeForm = this._formBuilder.group({
            libelle: ['', [Validators.required]],
            actif: [0],
            localisation: ['', [Validators.required]],
            empty1: [null],
            empty2: [null],
            empty3: [null],
            geler: [0],
            dateCreation: [new Date().toISOString()],
            idusrcreation: [1],
        } as unknown as Qrcode);
    }

    SaveQrcode() {
        const formData = this.qrcodeForm.value;
        this.qrcodeService.SaveQrcode(formData).subscribe(response => {
          console.log(formData, 'form');
        });
      }

    printQrCode() {
        const printContent = document.querySelector('.qr-code-content').outerHTML;
        const popupWin = window.open();
        popupWin.document.write(`
            <html>
                <head>
                <style>

                    @media screen {

                        .qr-code-content {
                            display: flex;
                            justify-content: center;
                            margin-top : 50px;
                            }
                        }

                    @media print {

                    .qr-code-content {
                        display: flex;
                        justify-content: center;
                        margin-top : 250px;
                        }
                    }

                </style>
                </head>
                <body onload="window.print()">
                    ${printContent}
                </body>
            </html>`
            );
        popupWin.document.close();
    }

    // Generer la chaine de caractère
    // Math.random, fonction renvoi nbr aléatoire [0,1[ (0 inclu et 1 exclu)
    // Math.floor renvoie le plus grand entier qui est inférieur ou égal à un nombre x
    // Ex: 3,14 = 3 / 9,999 = 9
    // charAt() renvoi une nouvelle caractère en fonction de ses argument
    generateRandomValue(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // Crypter la chaine de caractère, cette fonction est appeller dans le html
    // Pour generer et crypter une chaine de caractère
    generateAndEncrypt(): void {
        const randomValue = this.generateRandomValue();
        this.qrCodeValue = randomValue;
        const key = 'my-secret-key';
        this.encryptedValue = CryptoJS.AES.encrypt(randomValue, key).toString();
        console.log(this.qrCodeValue, 'value');
        console.log(this.encryptedValue, 'encode');
        
    }
    
}
