<div align="center" style="text-align: center;">
	<h1> LIDE </h1>

[![DeepScan grade](https://deepscan.io/api/teams/17848/projects/21192/branches/600823/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=17848&pid=21192&bid=600823)
</div>


<div align="center" style="text-align: center;">
<h2 color="red" style="color:red;">ARCHIVED</h1>
</div>

*TL DR: For several reasons this project will be archived and no longer maintained.*

The V3 of LIDE as reach the end of his life.

###### Goals
The project has reached many goals from being the first version of it deployed and used in the real world for a real usage for real course with real students, linked to the real university backends. This project in the end has been used by a bit more than an hundred unique students and a few teachers. The project also fixed a lot of security issues, take a lot of feedback from all users, it helps me learn a lot also.

###### Thanks
I would like to thanks every one who use this platform, especially if you gave feedback. Thanks also to Matéo, Victor and Alexandre who followed me using this platform during our course we teach. Thanks to the teachers who put any interest and time in this project. And a very special thanks to Tanguy (@tanguy-sudo) who supports me and gave me the original opportunity to start this adventure.

###### Reason
This project version is stopped for a lot of reasons, i will be short and ingore some of them. I'm no longer part of the university were this project belongs to, this project was a lot of fun and learn me a lot but takes a lot of my personnal time to maintain, update and upgrade. Some of the teachers discouraged me from upgrading this project and forward it to the next generation.

###### V4 ?
If for any reasons you would like to make this project come back to life, re-deploy it,
re maintain it, etc. Feal free to do so, just keep it free, for the university of angers or any other public university, and i'm not responsible for anything occuring with this project anymore. If you need help feel free to message me.  

Thanks.

<hr/>

Ce projet est issu d'un projet étudiants de l'Université d'Angers et repris par quelques étudiants pour le tutorat. Il consiste en une interface avec de multiple fonctionnalité de développement en ligne dans le navigateur, sans installation pour tous les étudiants et enseignants de l'université.

## Table des matières
 - [Installation 🛠️](#Installation)
 - [Utilisation 🚀](#Utilisation)
 - [Architecture ⚙️](#Architecture)
 - [Technologies 🧱](#Technologies)

## Installation

### 1️⃣ Installation de docker

Ce projet utilise docker et docker-compose, pour les installer :
| Dépendances | version minimum | version recommandé |
|-------------|-----------------|--------------------|
| [Docker Engine](https://docs.docker.com/engine/install/) | 20.0.0 | 20.10.14 |
| [Docker Compose](https://docs.docker.com/compose/install/) | 1.27.0 | 1.29.2 |


Ce projet utilise aussi l'API de docker, il faut donc l'activer, sous debian :
```bash
sudo sed -e -i "s/ExecStart\(.*\)/ExecStart\1 -H=tcp:\/\/0.0.0.0:2375 /g" /lib/systemd/system/docker.service
sudo shutdown -r now
```

### 2️⃣ Configuration de l'environnement

```bash
cp .env.example .env
mkdir HTTPS_CREDENTIALS
```

Vous devrez déposer dans le dossier HTTPS_CREDENTIALS un fichier `cert.pem` et `privkey.pem`
Qui sont deux fichier de certificat pour sécurisé par HTTPS les échanges.

Penser aussi à éditer le fichier `.env` pour l'ajuster à votre environnement.

### 3️⃣ Construction des images

```bash
docker-compose build
for container in $(find lide-back/images/ -maxdepth 1 -mindepth 1 -type d); do  docker build $container -t $( echo $container | cut -f 3 -d "/" )_lide ; done
```

## Utilisation

Pour lancer le projet vous pouvez simplement utiliser docker-compose :
```bash
# Lancement
docker-compose up -d
# Arrêt
docker-compose down
```

Le site sera ensuite disponible sur [https://localhost/](https://localhost/)

Assurez-vous que les ports utilisé par LIDE soit disponible sur votre machine.

_Par défaut il s'agit des ports 443,10000,10001_

## Architecture

 ![Architecture de l'application](documents/architecture_app.svg)  

## Technologies

 Le projet s'articule autour de plusieurs technologies. Voici les principales :  

  - ***Docker*** pour le déploiement et l'installation de l'application (https://docs.docker.com/) et la Docker API (https://docs.docker.com/engine/api/v1.41/)
  - ***Nodejs*** pour la création des différents serveurs (https://nodejs.org/en/)

  **Serveur web :**
   - ***VueJS*** pour l'interface graphique de l'application (https://vuejs.org/) et son gestionnaire de store ***VueX*** (https://vuex.vuejs.org/)
   - ***Vuetify*** pour l'intégration de composants conçus pour VueJS (https://vuetifyjs.com/)
   - La bibliothèque ***CodeMirror*** pour l'éditeur de texte (https://codemirror.net/)
   - La bibliothèque ***Xtermjs*** pour le terminal IHM (https://xtermjs.org/)

   **Serveur API :**
   - ***Expressjs*** pour la création des routes (https://expressjs.com/)
   - ***JWT*** pour la sécurité de l'API, la gestion de token de session (https://jwt.io/introduction)
   - La bibliothèque ***child process*** js pour les commandes systèmes (https://nodejs.org/api/child_process.html)

   **Serveur WebSocket :**
   - ***WebSocket*** : (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

   **Base de données :**
   - ***MongoDB*** pour la base de données (https://www.mongodb.com/3)

   **Authentification :**
   - ***CAS*** Pour l'authentification au sein de l'université (https://apereo.github.io/cas/6.2.x/protocol/CAS-Protocol.html)
