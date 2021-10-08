let base = document.querySelector('.base'); 
const premiereCase = document.getElementById('premiere-case'); // cas en haut
const boxs = document.querySelectorAll('.case'); // les 3cases
const destroy = document.querySelector('.destroy'); // poubelle supprimer
const allCases = []; // toutes les case ains que la poubelle
const choix = [];
let photoEnCours;

for(i = 0; i < boxs.length; i++){
    allCases.push(boxs[i]); // toutes les cases sont pousser (push) dans le tableau
}
allCases.push(destroy);

let indexPhoto = 1; // image 

base.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})` // pour afficher l'image aléatoire
photoEnCours =  `url(https://loremflickr.com/320/240?random=${indexPhoto})`; // photo de départ

function nvBase(){ // fonction nouvelle base

    const newBase = document.createElement('div'); // créer une new div
    newBase.setAttribute('class', 'base'); // attribut class base
    newBase.setAttribute('draggable', 'true'); // attribut dragger
    indexPhoto++; // 2, nouvelle photo aléatoire
    newBase.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})` 
    photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    premiereCase.appendChild(newBase);
    base = newBase; // nouvelle base

}


for(const vide of allCases) {

    vide.addEventListener('dragover', dragOver); // survol, glisse l'élément
    vide.addEventListener('dragenter', dragEnter); // rentre dans l'élément
    vide.addEventListener('drop', dragDrop); // lache l'élément

}




function dragOver(e){ // autorise de faire glisser l'élément
    e.preventDefault();
}
function dragEnter(e){ // autorise de faire rentrer l'élément
    e.preventDefault();
}


function dragDrop(){ // fonction de lacher l'élément

    if(this.id === "premiere-case"){ // id strictement égale à la 1ere case, si on pause l'image sur la 1ere case
        return; // enlève
    }
    console.log(this.id === "destroy"); 
    // destroy
    if(this.id === "destroy") { // pause dans la poubelle
        base.remove(); // affiche une new image
        nvBase(); // une new imge s'affiche
        return; // enlève
    }

    // Verouillage

    this.removeEventListener('drop', dragDrop); // enlève l'évenement
    this.removeEventListener('dragenter', dragEnter); // enlève l'évenement
    this.removeEventListener('dragover', dragOver); // enlève l'évenement

    this.appendChild(base);
    this.childNodes[0].setAttribute('draggable', false); // pour ne pas enlevé les images dans les 3 cases 
    nvBase();

    choix.push(photoEnCours); 
    if(choix.length === 3){  // si les 3 images sont pauser dans les cases
        setTimeout(() => {
            alert('Sélection terminée !') // un message s'affiche à la fin
        }, 200) //0.2 secondes
    }

}