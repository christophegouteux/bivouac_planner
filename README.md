# Architecture - BivouacPlanner

## 1. Vision

BivouacPlanner est un outil web permettant de créer des itinéraires
de randonnée et de trail à partir d'une carte interactive.

L'objectif est de proposer une expérience simple et légère pour :

- créer un itinéraire
- visualiser son tracé
- consulter ses statistiques
- exporter le parcours au format GPX

BivouacPlanner est développé comme un projet indépendant avec la
possibilité d'être intégré ultérieurement à Carnet2Bivouac.

## 2. Objectif V1

La première version doit permettre à l'utilisateur de :

- afficher une carte interactive
- sélectionner un point de départ
- sélectionner un point d'arrivée
- ajouter des points intermédiaires
- calculer automatiquement un itinéraire
- afficher la distance
- afficher le dénivelé positif
- afficher le dénivelé négatif
- supprimer des points
- réinitialiser l'itinéraire
- exporter l'itinéraire au format GPX

## 3. Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Leaflet
- OpenStreetMap
- openrouteservice

## 4. Architecture

### Frontend

Next.js / React assure :

- l'interface utilisateur
- la gestion des interactions avec la carte
- l'affichage des statistiques
- la gestion de l'itinéraire

### Cartographie

Leaflet est utilisé pour :

- afficher la carte
- afficher les marqueurs
- afficher le tracé
- gérer les interactions utilisateur

OpenStreetMap fournit les données cartographiques.

### Routage

openrouteservice est utilisé pour calculer les itinéraires
à partir des points définis par l'utilisateur.

### Export

Les itinéraires peuvent être exportés au format GPX.

## 5. Évolution possible

Le projet pourra évoluer vers :

- import GPX
- modification avancée du tracé
- profil altimétrique
- points d'intérêt
- sauvegarde des itinéraires
- partage d'itinéraires
- intégration avec Carnet2Bivouac