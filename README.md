# Thème hackorder pour le blog Ghost

Réalisation d'un thème personnalisé pour le CMS [Ghost](https://ghost.org/)

## Environnement requis

  * [Git](http://git-scm.com)
  * [Node.js](http://nodejs.org)
  * [Grunt](http://gruntjs.com/)
  * [Bower](http://bower.io)
  * [Ghost](https://ghost.org/)

## Installation

```bash
git clone https://github.com/alvinberthelot/hackorder
cd hackorder
npm install && bower install
```

## Distribution

```bash
grunt build
ln -s [REPERTOIRE_THEME]/dist [REPERTOIRE_GHOST]/content/themes/hackorder
```
## Démarrage Ghost

```bash
cd [REPERTOIRE_GHOST]
npm start
```
