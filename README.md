# React + Vite

# Formulaire d'Inscription Utilisateur

## Description
Formulaire d'inscription avec validation en temps réel :
- Vérification de l'âge (18+)
- Format code postal français
- Validation noms et email
- Stockage local des données
- Notifications toast
- Tests complets (coverage 100%)

## Installation & Démarrage
Depuis un terminal :
git clone https://github.com/yourusername/user-registration
cd user-registration

# Installer dépendances
npm install

# Lancer en dev
npm run dev

______________________

## Exécuter les tests
# Tests unitaires et intégration
npm test

# Coverage
npm run test:coverage

# Tests Implémentés
Validation des noms (caractères spéciaux, accents)
Validation email
Format code postal
Calcul d'âge et vérification majorité
Comportement formulaire (disable/enable bouton)
Stockage local et notifications
Messages d'erreur

______________________

## Infos
# Validation des Champs
Âge : minimum 18 ans
Code postal : format français (5 chiffres)
Noms : lettres, accents, tirets autorisés
Email : format standard
Tous champs requis pour activation du bouton

# Technologies
React 18 + Vite
Vitest + Testing Library
TailwindCSS
React-Toastify