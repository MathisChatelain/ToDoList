function mobilecheck() {
    return (typeof window.orientation !== "undefined") 
      || (navigator.userAgent.indexOf('IEMobile') !== -1
      );
};

class ToDoList{

    static addToDo(){
        
        var tache = document.getElementById("toDoInput").value;
        
        if (typeof(tache)=="string" && tache.length>0 ){  
            
            let nouvelleTache = document.createElement("li");
            nouvelleTache.innerHTML = "<div class='checkboxFalse'></div><div class='cross'></div><p>"+tache+"</p>" ;

            // On ecoute les clicks sur la checkbox, comme c'est une méthode on utilise ()=> pour l'appeller
            if(mobilecheck()){ //-Mobile
            nouvelleTache.children[0].addEventListener('touchstart',() => ToDoList.checkboxSwap(nouvelleTache.children[0]));
            nouvelleTache.children[1].addEventListener('touchstart',() => ToDoList.removeToDo(nouvelleTache));
            }
            else{
            // nouvelleTache.children[1] correspond à la croix pour supprimer - PC
            nouvelleTache.children[0].addEventListener('click',() => ToDoList.checkboxSwap(nouvelleTache.children[0]));
            nouvelleTache.children[1].addEventListener('click',() => ToDoList.removeToDo(nouvelleTache));
            }

            let cible = document.getElementById("toDoContainer");
            
            cible.appendChild(nouvelleTache);

            // Processus d'enregistrement dans le localStorage
            localStorage.setItem(tache,"unChecked"); // l'id des propriétées de la tache est le nom de la tache
            
            document.getElementById("toDoInput").value = '';

            return 0;
        }
        else{
            return 1;
        }
    }

    static checkboxSwap(checkbox){
        let tache = checkbox.parentElement.children[2].innerHTML; // tache associée à cette checkbox
        
        if(checkbox.className == 'checkboxFalse'){
            checkbox.className = 'checkboxTrue';
            localStorage.setItem(tache,"Checked"); // Update de l'etat dans le storage
            return 0;
        }
        else if(checkbox.className == 'checkboxTrue'){
            checkbox.className = 'checkboxFalse';
            localStorage.setItem(tache,"unChecked");
            return 0;
        }
        else{
            console.log('nor checkboxTrue nor checkboxFalse')
            return 1;
        }
    }

    static removeToDo(elem){
        let tacheASupprimer = elem.children[2].innerHTML; // l'intérieur du paragraphe <p>tache</p>
        localStorage.removeItem(tacheASupprimer); 
        elem.parentElement.removeChild(elem);
    }

    static loadStorage() {
        let cible = document.getElementById("toDoContainer");
        
        //Comme on enregistre des taches dans localStorage il suffit de relancer la partie affichage de addToDo
        for (var i = 0; i < localStorage.length; i++) {
            let tache = localStorage.key(i);
              
            let nouvelleTache = document.createElement("li");
            nouvelleTache.innerHTML = "<div class='checkboxFalse'></div><div class='cross'></div><p>"+tache+"</p>" ;
            
            if(mobilecheck()){ //-Mobile
                nouvelleTache.children[0].addEventListener('touchstart',() => ToDoList.checkboxSwap(nouvelleTache.children[0]));
                nouvelleTache.children[1].addEventListener('touchstart',() => ToDoList.removeToDo(nouvelleTache));
                }
                else{
                // nouvelleTache.children[1] correspond à la croix pour supprimer - PC
                nouvelleTache.children[0].addEventListener('click',() => ToDoList.checkboxSwap(nouvelleTache.children[0]));
                nouvelleTache.children[1].addEventListener('click',() => ToDoList.removeToDo(nouvelleTache));
            }
            
            cible.appendChild(nouvelleTache);

            // Charge l'etat en mémoire de la checkbox
            if(localStorage.getItem(tache) == "Checked"){
                nouvelleTache.children[0].className = 'checkboxTrue';
            }
            else if(localStorage.getItem(tache) == "unChecked"){
                nouvelleTache.children[0].className = 'checkboxFalse';
            }
        }
    }
}

// Ajout ToDo par 'click'
const eltAjout = document.getElementById('ajout');
eltAjout.addEventListener('click', ToDoList.addToDo);

// Ajout ToDo par 'enter'
document.addEventListener('keydown', logKey);
function logKey(e) {
  if(e.key == 'Enter'){
      ToDoList.addToDo();
      return 0;
  }
}

// Chargement des anciennes ToDo
window.onload = ()=>ToDoList.loadStorage();

// Nettoyage de LocalStorage
// localStorage.clear();