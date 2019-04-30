

export class VarGlobal {
    public title: string = "null";  // titre qui s'affiche dans la barre de menu

    public menu: any = []; //le menu de navigation pour le DME

    public loggedOutPages: any = [];
    
    public user: any;  // Contiendra les informations sur l'utilisateur
    public session: number = 0;  // prend deux valeurs 0 ou 1 (1 si l'utilisateur est identifié)

    public dme: any[]; // Contient une partie du DME (par exemple la liste des allergies)
    public message: string = "-"; // Contient le messages pour donner une information (en général lorsqu'il n'y a pas de résultats)

    public news: any[]; //Contient les news de la page d'accueil
    public epi: any[]; // Contient les alertes épidemies de la page d'accueil

    public player_id: string;  // contient le player id de OneSignal
    
    constructor() {
        
    }
}