# Description API coter serveur

## Authentification()

- Parametre entree : clef daccess
- Parametre sortie : String valider ou refuser

## RecupererLogementParId()

- Parametre entree : int id
- Parametre de srotie : Json array avec un seul logement

## RecupererListeParDefault()

- Parametre entree : Position -> array avec longitude et lattitude de l'utilisateur, Distance-> parametre facultatif avec valeur par defaut en Km
- Prametre sortie : JSon array avec les logements correspondant

## RecupererListeFiltre()

- Parametre entree : Position -> array avec longitude et lattitude de l'utilisateur, Distance-> parametre facultatif avec valeur par defaut en Km, prix -> prix maximum des resultats a afficher sur la carte
- Prametre sortie : JSon array avec les logements correspondant

# Description coter Client

## Types de modele :
 - Logement

## DAO :

 - LogementDao
 - Le logement DAO peut appeller la liste par Default, un logement unique par defaut ainsi que passer une liste filtrer de resultat
 ### RecupererListeParDefault()
 Ne prend pas de parametre d'entrer, recuperer automatiquement la localisation de l'utilisateur pour et l'enoive a LAPI
 Retourne une liste de features mapbox recuperer par lapi

# Echantillon de données

```json
{
  "nom": "Appart entier à louer à Sainte-Foy",
  "description": "Superbe logement très propre de 2 pièces et demi air ouverte. Il est situé dans le quartier de Ste-Foy, près de toutes les commodités et à seulement quelques minutes de l'université Laval. Un vrai nid douillet parfait pour 2 personnes Accès à l'appartement au complet sans restriction ainsi qu'à la connection internet wifi. Un stationnement est aussi disponible gratuitement. Je serais disponible pour répondre à tous vos questionnements par téléphone, il m'est aussi possible de me déplacer si besoin est. Quartier centrale où toutes les commodités sont présentes à moins de 10 Minutes de marches. Supermarchés, parcs, arrêts de bus ((PHONE NUMBER HIDDEN) et plusieurs autres). Vous avez également le centre commercial quatre-bourgeois à 5 Minutes et celui de place Laurier à 10 Minutes en autobus. L'université Laval se trouve à 15 Minutes en bus. Et vous pouvez vous rendre au centre-ville de Québec en une 20aines de Minutes. Les bus (PHONE NUMBER HIDDEN) se trouvent à 5 Minutes de marche. Note",
  "image": "https://a0.muscache.com/im/pictures/d092ac9b-5eeb-4665-b637-8012549b313e.jpg?aki_policy=medium",
  "vile": "Ville de Québec",
  "privince": "QC",
  "code_postale": "G1X 3E3",
  "pays": "Canada",
  "latitude": "46.76943997952112",
  "longitude": "-71.315854267678",
  "prix": 45
}
```

Exemple dans un array pour maxpbox :

```javascript
const logement = {
    "type": "FeatureCollection",
    "features": [
        {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
            -71.315854267678
            46.76943997952112
            ]
        },
        "properties": {
            "nom": "Appart entier à louer à Sainte-Foy"",
            "description": ""Superbe logement très propre de 2 pièces et demi air ouverte. Il est situé dans le quartier de Ste-Foy, près de toutes les commodités et à seulement quelques minutes de l'université Laval. Un vrai nid douillet parfait pour 2 personnes Accès à l'appartement au complet sans restriction ainsi qu'à la connection internet wifi. Un stationnement est aussi disponible gratuitement. Je serais disponible pour répondre à tous vos questionnements par téléphone, il m'est aussi possible de me déplacer si besoin est. Quartier centrale où toutes les commodités sont présentes à moins de 10 Minutes de marches. Supermarchés, parcs, arrêts de bus ((PHONE NUMBER HIDDEN) et plusieurs autres). Vous avez également le centre commercial quatre-bourgeois à 5 Minutes et celui de place Laurier à 10 Minutes en autobus. L'université Laval se trouve à 15 Minutes en bus. Et vous pouvez vous rendre au centre-ville de Québec en une 20aines de Minutes. Les bus (PHONE NUMBER HIDDEN) se trouvent à 5 Minutes de marche. Note",
           "vile": "Ville de Québec",
           "privince": "QC",
           "code_postale": "G1X 3E3",
           "pays": "Canada",
           "prix": 45
        }
        }
        ]
     }
```
