export class ApiService {
    public mainUrl: string = "https://djiblog.net/apiwafu/c/"; 
    constructor() {
        
    }

    ajaxPost(url, data, callback) {
        var req = new XMLHttpRequest();
        req.open("POST", url);
        req.addEventListener("load",function(){
        if (req.status >=200 && req.status <400) {
          callback(JSON.parse(req.responseText));
        }else{
          console.error(req.status + " " + req.statusText);
        }
        });
        req.addEventListener("error", function () {
          console.error("Erreur réseau avec l'URL "+ url);
        });
        req.send(data);
    }
}