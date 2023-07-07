import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utilisateur } from 'app/interfaces/administration/utilisateur';
import { DashboardService } from 'app/services/dashboard/dashboard.service';

@Component({
    selector     : 'dashboard',
    templateUrl  : './dashboard.component.html',
    styleUrls    : ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit
{
    dataTypeAssidute1: any;
    NombreUser : number =0 ;
    NombrePermission: number=0;
    // nomPermissionnaire : number =( (this.NombreUser) - (this.NombrePermission));

// Mois à selectionner
    
    // Graphe Assiduité du Jour

    typeTypeAssidute = 'PieChart';
    dataTypeAssidute = [];
    grapheTypeAssidute = {
        data: [],
        columnNames: ['Browser', 'Percentage'],
        options: {
            height: 210,
            width: 330,
            chartArea: {
                left: 40,
                width: '100%',
                height: '100%',
            },
            is3D: true,
            pieSliceText: 'percentage',
            // slices: {
            //     2: { offset: 0.15 },
            //     8: { offset: 0.1 },
            // },
        },
    };

    //graphe vue d'ensemble
    typePermissionStatut = 'PieChart';
    dataPermissionStatut = [];
    graphePermissionStatut = {
        data: [],
        columnNames: ['Browser', 'Percentage'],
        options: {
            height: 280,
            width: 380,
            chartArea: {
                left: 40,
                width: '100%',
                height: '100%',
            },
            is3D: true,
            pieSliceText: 'percentage',
            slices: {
                2: { offset: 0.15 },
                8: { offset: 0.1 },
                10: { offset: 0.15 },
                11: { offset: 0.1 },
            },
        },
    };


  //graphe vue des plus assidus
  typeVueAssidute = 'PieChart';
  dataAssidute = [];
  grapheAssidute = {
      data: [],
      columnNames: ['Browser', 'Percentage'],
      options: {
        //    pieHole:0.4,
          height: 100,
          width: 395,
          colors:['Grey','brown', 'Green','Orange','Red'], 
          chartArea: {
              left: 10,
              width: '100%',
              height: '100%',
          },
          is3D: true,
          pieSliceText: 'percentage',
        //   slices: {
        //       2: { offset: 0.15 },
        //       8: { offset: 0.1 },
        //       10: { offset: 0.15 },
        //       11: { offset: 0.1 },
        //   },
      },
  };



   //graphe vue du retard de chaque service
   typeVueRetardService = 'PieChart';
   dataRetardService = [
       ['COMPTABILITE ',50],
       ['INFORMATIQUE', 20],
       ['RH', 20],
       ['MARKETING', 10]
       
   ];
   grapheRetardService = {
       data: [],
       columnNames: ['Browser', 'Percentage'],
       options: {
            pieHole:0.4,
           height: 200,
           width: 450,
           chartArea: {
               left: 30,
               width: '100%',
               height: '100%',
           },
           is3D: false,
           pieSliceText: 'percentage',
         //   slices: {
         //       2: { offset: 0.15 },
         //       8: { offset: 0.1 },
         //       10: { offset: 0.15 },
         //       11: { offset: 0.1 },
         //   },
       },
   };

   //graphe vue selon le sexe
   typeVueSexe = 'PieChart';
   dataSexe = [];
   grapheSexe = {
       data: [],
       columnNames: ['Browser', 'Percentage'],
       options: {
        height: 100,
        width: 390,
           chartArea: {
               left: 30,
               width: '100%',
               height: '100%',
           },
           is3D: true,
           pieSliceText: 'percentage',
         //   slices: {
         //       2: { offset: 0.15 },
         //       8: { offset: 0.1 },
         //       10: { offset: 0.15 },
         //       11: { offset: 0.1 },
         //   },
       },
   };


// graphe des taux des types de permission les plus utilisé
// titleTypePermission = 'Taux des type de permission';
// typeTypePermission = 'ComboChart';
// dataTypePermission = [
//    ["Type de permission", 50,100,90,20],
  
   
// ];
// graphTypePermission = {
//     data : [] ,
// columnNames : ['Type de permission', 'Congé sans solde','Congé avec solde','Congé maladie','Congé de formation'],
// options : {   
//    hAxis: {
//     //   title: 'Type de permission'
//    },
//    vAxis:{
//       title:'Nombre'
//     //   minValue:0
         
//    },
//    seriesType: 'bars',
// //    series: {7: {type: 'line'}},
//    height : 320, 
//    width:420,
// }

// };

typeTypePermission = 'PieChart';
dataTypePermission = [];
graphTypePermission = {
    data: [],
    columnNames: ['Browser', 'Percentage'],
    options: {
         pieHole:0.4,
        height: 280,
        width: 380,
        chartArea: {
            left: 30,
            width: '100%',
            height: '100%',
        },
        is3D: false,
        pieSliceText: 'percentage',
      //   slices: {
      //       2: { offset: 0.15 },
      //       8: { offset: 0.1 },
      //       10: { offset: 0.15 },
      //       11: { offset: 0.1 },
      //   },
    },
};


// graphe des taux de Retard selon le sexe
titleRetardSexe = 'Taux de Retard selon le sexe';
typeRetardSexe = 'BarChart';
dataRetardSexe = [];
graphRetardSexe = {
    data : [] ,
columnNames : ['Retard selon le sexe', 'HOMME','FEMME'],
options : {   
   hAxis: {
      title: 'Retard selon le sexe'
   },
   vAxis:{
      minValue:0
         
   }  ,
   width: 350,
height : 200, 
}
};


// graphe des taux de permission selo le sexe
titlePermissionSexe = 'Taux de permission selon le sexe';
typePermissionSexe = 'BarChart';
dataPermissionSexe = [
   ["permission", 50, 90],
   
];
graphPermissionSexe = {
    data : [] ,
columnNames : ['Permissions demandées selon le sexe', 'HOMME','FEMME'],
options : {   
   hAxis: {
      title: 'Permissions demandées selon le sexe'
   },
   vAxis:{
      minValue:0
         
   } ,
//    width: 350,
height : 200, 
},
  
};

// Graphe courbe des valeurs mensuelles de permission, retard , absence et présence

title = 'courbe des valeurs mensuelles';
type = 'ComboChart';
datagraphCourbe =[] ;
graphCourbe = {
    data : [] ,
columnNames : ['Mois', 'Présence','Retard','Abscence','Permission'],
options : {   
   hAxis: {
      title: 'Periode'
   },
   vAxis:{
      title: 'Taux'
   },
   seriesType: 'bars',
   series: {2: {type: 'line'}},
   
height : 410,
},

};


    /**
     * Constructor
     */
    constructor(
        private dashboardService: DashboardService,
    )
    {
    }
    ngOnInit(): void {
        this.getTauxAnnuel();
        this.getPermissionByStatut();
        this.getQuatreTypePermission();
        this.getGraphByDay();
        this.getRepartitionGenre();
        this.getRetardataire();
        this.getRetardatByGenre();
        this.getPermissionByGenre();
        this.getNombreUser();
        this.getNombrePermissionnaire();
        // this.getnomPermissionnaire();

        this.grapheRetardService.data = this.dataRetardService;    
    }

// Fonction d'affichage

     // Affichage de données du taux annuel
     getTauxAnnuel() {
        // this.inProgress = true; // Démarre le loader
        const getTauxAnnuel = this.dashboardService.TauxAnnuel();
        getTauxAnnuel.subscribe((result) => {
            this.datagraphCourbe = result.result;
            this.graphCourbe.data = this.datagraphCourbe;
            console.log(this.graphCourbe.data,'this.graphCourbe.data');
            console.log(this.datagraphCourbe, 'datagraphCourbe')
        });
      }
// Afficher les 4 types de permissions les plus demandé
      getQuatreTypePermission() {
        // this.inProgress = true; // Démarre le loader
        const getQuatreTypePermission = this.dashboardService.QuatreTypePermission();
        getQuatreTypePermission.subscribe((result) => {
            this.dataTypePermission = result.result;
            this.graphTypePermission.data = this.dataTypePermission;
            console.log(this.dataTypePermission, 'dataTypePermission')
        });
      }

      // Affichage de données des permission selon le statut
     getPermissionByStatut() {
        // this.inProgress = true; // Démarre le loader
        const getPermissionByStatut = this.dashboardService.PermissionByStatut();
        getPermissionByStatut.subscribe((result) => {
            this.dataPermissionStatut = result.result;
            this.graphePermissionStatut.data = this.dataPermissionStatut;
            console.log(this.dataPermissionStatut, 'dataPermissionStatut')
        });
      }

      
      // Affichage de données du graphe des données du jours
     getGraphByDay() {
        // this.inProgress = true; // Démarre le loader
        const getGraphByDay = this.dashboardService.recupérerinfoDay();
        getGraphByDay.subscribe((result) => {
            this.dataTypeAssidute = result.result;
            this.dataTypeAssidute1 = result.result1
            this.grapheTypeAssidute.data = this.dataTypeAssidute;
            console.log(this.dataTypeAssidute1, 'dataTypeAssidute')
        });
      }



// Fonction pour récuperer les infos selon le genre
     getRepartitionGenre() {
        // this.inProgress = true; // Démarre le loader
        const getRepartitionGenre = this.dashboardService.recupérerRepartitionGenre();
        getRepartitionGenre.subscribe((result) => {
            this.dataSexe = result.result;
            this.grapheSexe.data = this.dataSexe;
            // console.log(this.dataSexe, 'dataTypeAssidute')
        });
      }

      
// Fonction pour récuperer le top 5 des retardataires
     getRetardataire() {
        // this.inProgress = true; // Démarre le loader
        const getRetardataire = this.dashboardService.recupérerRetardataire();
        getRetardataire.subscribe((result) => {
            this.dataAssidute = result.result;
            this.grapheAssidute.data = this.dataAssidute;
            // console.log(this.dataAssidute, 'dataTypeAssidute')
        });
      }



           
// Fonction pour récuperer le top 5 des retardataires
     getRetardatByGenre() {
        // this.inProgress = true; // Démarre le loader
        const getRetardatByGenre = this.dashboardService.recupérerRetardByGenre();
        getRetardatByGenre.subscribe((result) => {
            this.dataRetardSexe = result.result;
            this.graphRetardSexe.data = this.dataRetardSexe;
            // console.log(this.dataRetardSexe, 'dataTypeAssidute')
        });
      }


      
           
// Fonction pour récuperer les retards selon le genre
     getPermissionByGenre() {
        // this.inProgress = true; // Démarre le loader
        const getPermissionByGenre = this.dashboardService.recupérerPermissionByGenre();
        getPermissionByGenre.subscribe((result) => {
            this.dataPermissionSexe = result.result;
            this.graphPermissionSexe.data = this.dataPermissionSexe;
            // console.log(this.dataPermissionSexe, 'dataTypeAssidute')
        });
      }


               
// Fonction pour récuperer le nombre d'utilisateur
     getNombreUser() {
        // this.inProgress = true; // Démarre le loader
        let getNombreUser = this.dashboardService.recupérerNombreUser();
        getNombreUser.subscribe((result) => {
            this.NombreUser = result;
            // console.log(this.NombreUser, 'getNombreUser')
        });
      }
                     
// Fonction pour récuperer le nombre de permissionnaire
     getNombrePermissionnaire() {
        // this.inProgress = true; // Démarre le loader
        let getNombrePermissionnaire = this.dashboardService.recupérerNombrePermissionnaire();
        getNombrePermissionnaire.subscribe((result) => {
            this.NombrePermission = result;
            console.log(this.NombrePermission, 'NombrePermission')
        });
      }
  

    //   getnomPermissionnaire()
    //   {
    //     this.nomPermissionnaire= ((this.NombreUser) - (this.NombrePermission));
    //     console.log(this.nomPermissionnaire,'nomPermissionnaire');
        
    //   }
}
