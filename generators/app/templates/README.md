<%= appname %> <%= appversion %>
===============

# Prérequis

* NodeJS 8.X
* hornet-js-builder 1.X installé en global:

```shell
npm install -g hornet-js-builder
```

* checkout du projet `<%= slugify(appname) %>`

# Initialisation

Se positionner dans le répertoire du projet `<%= slugify(appname) %>` et lancer la commande:

```shell
hb install
```

# Démarrage de l'application en mode développement

## Commande par défaut

la commande à exécuter en mode développement est la suivante:

```shell
hb w
```

Elle permet de lancer l'application en mode `watcher` afin que les modifications soient prises en compte (ce qui
entrainera un redémarrage du serveur node dans le cas d'une détection de modification).

## Options

Il est également possible d'ajouter à cette commande l'option:

```shell
hb w -i
```

Cette commande indique au builder de ne pas transpiler les fichiers typescript en javascript.
Elle est à utiliser dans le cas où l'IDE a été configuré de telle sorte que la transpilation ts->js
se fasse via ce dernier.

# Vérification

Vous pouvez accéder à l'application depuis l'url [http://localhost:8888/<%= slugify(appname) %>/](http://localhost:8888/<%= slugify(appname) %>)

Du batch : 

`./scripts/run-batch.sh localhost 8888 secteurs/feeder`

## Packaging de l'application

```shell
hb package
```

Les livrables sont à récupérer dans le répertoire : `target`

- `<%= slugify(appname) %>-<%= slugify(appversion) %>-static.zip`
- `<%= slugify(appname) %>-<%= slugify(appversion) %>-dynamic.zip`

# Fichier de configuration de l'application : default.json

L'ensemble de la configuration applicative du serveur NodeJS se situe dans le fichier default.json contenu dans les sources de l'application.

Ce fichier ne doit pas être modifié, excepté pour le log console. Les modifications sont à apporter dans les fichiers d'infrastructure.

## Configuration applicative

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|contextPath| Contexte de l'application déployée|Par défaut vide|
|welcomePage|Page de démarrage de l'application|Passé en paramètre du ServerConfiguration|
|themeUrl|Url du thème CSS|[Protocol]://[host]:[port]/hornet/themeName|

```javascript
{
  "contextPath": "<%= slugify(appname) %>"
  ...<
}

```


## Configuration serveur

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|route|Route identifiée pour l'affinité de session nodejs|js1|
|port|Port de démarrage du serveur|8888|
|keepAlive|Activation du mode HTTP KeepAlive|true|
|maxConnections|Nombre maximal de connexions à l'instance nodejs|100|
|timeout|Timeout des réponses HTTP|300000|
|uploadFileSize|Taille maximale d'upload de fichier|1000000|
|sessionTimeout|Timeout des sessions utilisateur|1800000|

```javascript
  "server": {
    "route": "js1",
    "port": 8888,
    "keepAlive": true,
    "maxConnections": 100,
    "timeout": 300000,
    "uploadFileSize": 1000000,
    "sessionTimeout": 1800000
  }
```

## Configuration d'une base de données

Il est possible d'ajouter une configuration permettant de se connecter à une base de données.

Les configurations de base de données déclarés dans la configuration peuvent ensuite être utilisées dans une classe implémentant `IModelDAO` du projet `hornet-js-database`.

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|database|Object contenant la liste des bases de données et leur configuration||
|config| Nom de la base de données avec sa configuration||
|uri|Chaine de connexion à une bdd [sgbd]://[user]@[host]:[ports]/[name]||
|options|Options nécessaires ou facultatives pour le sgbd||
|define|Option Sequelize, timestamps : activation des timestamps dans les tables BDD||
|loggingLevel|Level de log de sequelize||
|reload|Indicateur pour exécution des scripts sql à chaque démarrage|false par défaut

```json
    "database": {
        "config": {
          "uri": "postgres://user@localhost:5433/<%= slugify(appname) %>",
          "options": {
            "operatorsAliases": false,
            "pool": {
              "max": 5,
              "min": 0,
              "idle": 1000
            },
            "define": {
              "timestamps": false
            },
            "loggingLevel": "INFO"
          },
          "reload": true
        }
      }
```

### Configuration de mock

Une fois le mode bouchon activé (définis sous la clé `mock.enabled` dans le fichier de configuration `default.json`), il faut definir les parties que l'on souhaite mocker : Soit les servicesPage soit les servicesData.


Rappels des clés à modifier:

|nom de la clé|exemple de valeur| Description|
|-------------|-----------------|------------|
|mock.enable|true|`true` Activer le mock de l'application|
|mock.servicePage.enabled|true| Bouchon des services pages |
|mock.serviceData.enabled|true| Bouchon des services data|

```json
  "mock": {
    "enabled": true,
    "servicePage": {
      "enabled": true
    },
    "serviceData": {
      "enabled": true
    }
  }
```
### Configuration du Request
#### Configuration du Cache

La gestion du cache est paramétrable côté client et serveur pour les requêtes.

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du cache sur les requêtes de services|true|
|timetolive|Durée de rétention du cache|60|

```json
"request": {
    "cache": {
      "client": {
        "enabled": false,
        "timetolive": 60
      },
      "server": {
        "enabled": false,
        "timetolive": 120
      }
    }
```

#### Configuration du timeout

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
| response  | &nbsp;      | &nbsp; |
| deadline  | &nbsp;      | &nbsp; |

```json
"request": {
    "timeout": {
      "response": 10000,
      "deadline": 60000
    }
```

## Configuration des mails

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|config|Object de configuration pour nodeMailer|https://nodemailer.com/smtp/|
|mailRecever|Mail servant de destinataire à l'envoi de mail||

```javascript
"mail": {
    "config": {
      "host": "127.0.0.1",
      "port": 25,
      "secure": false,
      "connectionTimeout": 20000,
      "tls": {
        "rejectUnauthorized": false
      },
      "auth": {
        "user": "user",
        "pass": "pass"
      }
    }

  }
```