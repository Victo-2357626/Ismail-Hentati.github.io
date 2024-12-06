// Les combinaisons gagnantes dans le jeu de Tic-Tac-Toe
const combinaisonsGagnantes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
 
// Élément HTML pour le score du joueur X
let elementScoreX = document.getElementById("XX");
// Élément HTML pour le score du joueur O
let elementScoreO = document.getElementById("OO");
 
// Scores récupérés du stockage local ou initialisés à 0
let scoreX = parseInt(localStorage.getItem("nX")) || 0;
let scoreO = parseInt(localStorage.getItem("nO")) || 0;
 
// Tableau représentant l'état du jeu
let plateau;
 
// Joueur actuel ('X' ou 'O')
let joueurActuel = 'X';
 
// Variable indiquant si un joueur a gagné
let gagnant = null;
 
// Les cases du plateau
const casesPlateau = Array.from(document.querySelectorAll('#board div'));
// Élément affichant les messages
const elementMessages = document.querySelector('h2');
// Bouton pour réinitialiser la partie
const boutonReinitialiser = document.getElementById('reset-button');
 
/*----- Événements -----*/
// Gestion des clics sur le plateau pour jouer un tour
document.getElementById('board').addEventListener('click', gererTour);
// Gestion des clics sur le bouton de réinitialisation
boutonReinitialiser.addEventListener('click', initialiserPartie);
 
/*----- Fonctions -----*/
 
/**
 * Vérifie si un joueur a gagné ou s'il y a égalité.
 * @returns {string|null} 'X', 'O', 'E' (égalité), ou null (pas de gagnant pour l'instant).
 */
function verifierGagnant() {
    combinaisonsGagnantes.forEach(function(combinaison) {
        if (plateau[combinaison[0]] && plateau[combinaison[0]] === plateau[combinaison[1]] && plateau[combinaison[0]] === plateau[combinaison[2]]) {
            gagnant = plateau[combinaison[0]];
        }
    });
    return gagnant ? gagnant : plateau.includes('') ? null : 'E'; // 'E' pour égalité
}
 
/**
 * Gère le clic d'un joueur, met à jour le plateau et vérifie le gagnant.
 * @param {Event} event - L'événement de clic sur une case du plateau.
 */
function gererTour(event) {
    let index = casesPlateau.findIndex(function(caseElement) {
        return caseElement === event.target;
    });
    if (plateau[index] === '') {
        plateau[index] = joueurActuel;
        joueurActuel = joueurActuel === 'X' ? 'O' : 'X'; // changement de tour
        gagnant = verifierGagnant();
        mettreAJourAffichage();
    }
}
 
/**
 * Réinitialise le plateau et les variables pour une nouvelle partie.
 */
function initialiserPartie() {
    plateau = ['', '', '', '', '', '', '', '', ''];
    gagnant = null;
    joueurActuel = 'X';
    mettreAJourAffichage();
    document.getElementById('board').addEventListener('click', gererTour); // Réactive les clics
}
 
/**
 * Met à jour l'interface utilisateur en fonction de l'état actuel du jeu.
 */
function mettreAJourAffichage() {
    plateau.forEach(function(symbole, index) {
        casesPlateau[index].textContent = symbole; // Remplit les cases avec X, O ou vide
    });
    elementMessages.textContent = gagnant === 'E' ? `C'est une égalité !` :
                                gagnant ? `${gagnant} a gagné la partie !` :
                                `C'est au tour de ${joueurActuel} !`;
    mettreAJourScores();
}
 
/**
 * Met à jour les scores des joueurs et les enregistre dans le stockage local.
 */
function mettreAJourScores() {
    if (gagnant === 'X') {
        scoreX++;
        elementScoreX.innerText = scoreX;
        localStorage.setItem("nX", scoreX); // Enregistre le score dans le stockage local
        document.getElementById('board').removeEventListener('click', gererTour); // Désactive les clics
    }
    if (gagnant === 'O') {
        scoreO++;
        elementScoreO.innerText = scoreO;
        localStorage.setItem("nO", scoreO); // Enregistre le score dans le stockage local
        document.getElementById('board').removeEventListener('click', gererTour); // Désactive les clics
    }
}
 
// Initialisation de la partie au chargement
initialiserPartie();
 
//------- Variables pour la fenêtre dialog -------//
const fenetreDialog = document.getElementById('project-dialog');
const boutonFermerDialog = document.getElementById('close-dialog');
const boutonDesactiverDialog = document.getElementById('disable-dialog');
 
// Ferme temporairement la fenêtre
boutonFermerDialog.addEventListener('click', () => {
    fenetreDialog.close();
});
 
// Désactive définitivement la fenêtre
boutonDesactiverDialog.addEventListener('click', () => {
    fenetreDialog.close();
    localStorage.setItem('desactiverDialog', 'true'); // Sauvegarde la désactivation
});
 
/**
 * Vérifie si la fenêtre dialog doit s'afficher au chargement.
 */
function verifierAffichageDialog() {
    const desactive = localStorage.getItem('desactiverDialog');
    if (!desactive) {
        fenetreDialog.showModal();
    }
}
 
// Lance la vérification au chargement de la page
verifierAffichageDialog();