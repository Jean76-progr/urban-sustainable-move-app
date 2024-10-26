# Urban Sustainable Move

Une application de mobilité durable développée pour la ville de Brno, permettant aux utilisateurs de visualiser et d'accéder à différentes options de transport écologique.

## 🌟 Fonctionnalités

- 🗺️ Carte interactive avec différents types de transport
- 🚗 Covoiturage vert
- 🚲 Groupes cyclistes
- 🚌 Visualisation des arrêts de bus et tram
- 📊 Statistiques en temps réel
- 👤 Système de compte utilisateur

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

### Installation des dépendances

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/urban-sustainable-move.git

# Accéder au dossier
cd urban-sustainable-move

# Installer les dépendances
npm install
```

### Packages requis

```bash
# Dépendances principales
npm install react-leaflet leaflet     # Pour la carte
npm install framer-motion             # Pour les animations
npm install lucide-react              # Pour les icônes
npm install react-router-dom          # Pour la navigation
npm install tailwindcss               # Pour le styling
npm install postcss autoprefixer      # Pour Tailwind CSS
```

### Configuration de Tailwind CSS

```bash
# Initialiser Tailwind CSS
npx tailwindcss init -p
```

## 🔧 Configuration

1. Créez un fichier `.env` à la racine du projet :
```env
REACT_APP_TITLE=Urban Sustainable Move
```

2. Assurez-vous que le fichier `tailwind.config.js` est correctement configuré :
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🏃‍♂️ Lancement

```bash
# Démarrer l'application en mode développement
npm start

# Construire l'application pour la production
npm run build
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## 📱 Compatibilité

L'application est entièrement responsive et compatible avec :
- 💻 Ordinateurs de bureau
- 📱 Smartphones
- 📟 Tablettes

## 🛠️ Structure du projet

```
src/
├── components/
│   ├── Account/
│   │   ├── AccountButton.js
│   │   ├── AuthModal.js
│   │   └── Profile.js
│   ├── Map/
│   │   ├── MainMap.js
│   │   ├── TransportFilters.js
│   │   └── TransportStats.js
│   └── SlidingMenu/
│       └── SlidingMenu.js
├── contexts/
│   └── AuthContext.js
├── App.js
└── index.js
```

## 🔐 Fonctionnalités d'authentification

- Création de compte
- Connexion
- Profil utilisateur éditable
- Statistiques personnelles
- Stockage local des données

## 🎨 Personnalisation

Pour modifier les styles :
1. Les classes Tailwind peuvent être modifiées directement dans les composants
2. Les couleurs principales peuvent être ajustées dans `tailwind.config.js`
3. Les styles personnalisés peuvent être ajoutés dans `src/index.css`

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add: Amazing Feature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## ✨ Remerciements

- OpenStreetMap pour les données cartographiques
- Leaflet pour la bibliothèque de cartographie
- L'équipe de Tailwind CSS
- La communauté React

## 📧 Contact

Votre Nom - [@votretwitter](https://twitter.com/votretwitter)

Lien du projet: [https://github.com/votre-username/urban-sustainable-move](https://github.com/votre-username/urban-sustainable-move)
