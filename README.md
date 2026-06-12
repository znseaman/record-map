# record-map

An application the user's actions and allows the user to undo / redo actions as well as reset the map to its original empty state. 🗺️ 📍

Play around with it [here](https://record-map.netlify.app/)!

## Why?

I liked playing around with the Redux DevTools and thought it would be cool to be able to move through the actions that happen on a map.

## Pre-Setup

### NodeJS
This tool requires the following to be setup prior to running the project:
- Node.js (install [nvm](https://github.com/nvm-sh/nvm) to manage node versions and see what version this project requires by viewing the `.nvmrc`)

## Setup

1. Clone repository
2. Change into the project directory
3. Download the required project dependencies and build the project by running:
```shell
npm install
```
4. Start the application:
```shell
npm start
```

## Features
1. Add points, lines, and polygons to the map
2. Edit points, lines, and polygons on the map
3. Combine points, lines, and polygons on the map
4. Uncombine points, lines, and polygons on the map
5. Delete points, lines, and polygons from the map
6. Undo the last action taken on the map
7. Redo / reapply the next action (if you have have previously applied undo)
8. Reset the map to initial state with no features