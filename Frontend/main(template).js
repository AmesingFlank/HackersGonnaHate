"use strict";


// This is the main script. The entry point is the onPageLoaded function, as specified in the body tag of index.html
// It sets the scene and begins the game loop which updates and renders everything.


const GAME_CANVAS_WIDTH = 1280;
const GAME_CANVAS_HEIGHT = 800;

const PLAYER_SPEED = 0.9

// All of these globals can be accessed from every other script in the game.
// Not great, but a quick way to get things working!
var scenes = [];
var graphics_context = null;
var last_update_time = null;
var player = null;
var score_board = null;


function onPageLoaded() {
    var canvas = initialiseCanvas("game_canvas");

    // Give the canvas focus so it receives our keyboard input.
    canvas.focus();

    initialiseScenes(canvas);

    startGameLoop();  
}


function initialiseCanvas(canvas_name) {
    var canvas = document.getElementById(canvas_name);
    graphics_context = canvas.getContext("2d");

    return canvas;
}


function initialiseScenes(canvas) {
    scenes.push(new Background());

    var menu = new Menu(canvas);
    scenes.push(menu);

    menu.startGame();
}


function startGameLoop() {
    window.requestAnimationFrame(update);
}


function update(timestamp) {
    var delta = 0.0;

    if (last_update_time) {
        delta = (timestamp - last_update_time) / 1000.0;
    }

    last_update_time = timestamp;

    // Update all the scenes, passing in how long it's been since the last update.
    scenes.forEach(function (scene) {
        scene.update(delta);
    });

    render();

    window.requestAnimationFrame(update);
}


function render() {
    // Render all the scenes.
    scenes.forEach(function (scene) {
        scene.render(graphics_context);
    });
}