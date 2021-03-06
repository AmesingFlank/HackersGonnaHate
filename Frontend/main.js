"use strict";
import {Game,Messenger,Hacker} from '../Game/Game.js'
import {Vec2} from '../Game/Vec2.js'
import {Background} from './background.js'
import { getGameOfLevel } from '../Game/Level.js';
import {readUserCode} from '../Game/ReadUserCode.js'

// This is the main script. The entry point is the onPageLoaded function, as specified in the body tag of index.html
// It sets the scene and begins the game loop which updates and renders everything.

// this the Game object defined in Game.js
// it includes messengers (an array), hackers (an array) and mapsize
var gameObject;   

// this is the grid that we see on the screen
var background;

// the precise time when we start the game
var startTime = null;

// gameStamp is an integer starting from 0; it indicates the number of rounds that have lapsed
var gameStamp;

// delta is the difference between current time and original time
var delta;

var graphics_context = null;

var boardInfo;

let currentLevel = 0

//entry point
function onPageLoaded() {

    console.log([graphics_context,canvas])

    if(graphics_context ){
        console.log("clearing")
        graphics_context.clearRect(0,0,graphics_context.canvas.width,graphics_context.canvas.height);
        graphics_context.canvas.width = graphics_context.canvas.width
    }

    // get the canvas block element from HTML
    var canvas = initialiseCanvas("game_canvas");


    

    // initialise game object (messengers, hackers, mapsize)
    initialiseGameObject();

    // initialise the background object
    initialiseBackground(canvas);

    initialiseCodebox();

    startGameLoop();  
}

window.onPageLoaded = onPageLoaded

let description_height = document.getElementById("level_description").offsetHeight;
console.log(description_height);

const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "javascript"
});
editor.setSize(550, 520);



//canvas is an HTML block element; it's the canvas that we render on
function initialiseCanvas(canvas_name) {
    var canvas = document.getElementById(canvas_name);
    graphics_context = canvas.getContext("2d");

    return canvas;
}

function initialiseBackground(canvas) {

    background = new Background(700, 700, gameObject.mapSize, gameObject.destination);
    boardInfo = {sideLength: background.getSideLength(), mapSize: gameObject.mapSize, shift: background._shift};
}

function initialiseCodebox(){
    
    let textBox = document.getElementById("code");
    let applyBtn = document.getElementById('apply');
    let gameResultText = document.getElementById("gameResultText")
    gameResultText.innerHTML = "";

    applyBtn.onclick = ()=>{
        gameObject.started = true

        let code = editor.getValue();
        editor.get
        console.log("reading \n"+code)
        for(let i = 0;i<gameObject.messengers.length;++i){
            readUserCode(gameObject.messengers[i],code)
        }
    }

    editor.setValue(gameObject.initialCode);


    let title = document.getElementById("level_text");
    let description = document.getElementById("level_description");

    title.innerHTML = gameObject.title;
    console.log(gameObject.description)
    description.innerHTML = gameObject.description


    let resetBtn =  document.getElementById('reset');
    resetBtn.onclick = ()=>{
        onPageLoaded();

    }


    let selector = document.getElementById("levelSelect")
    console.log(selector)
    selector.onchange = ()=>{
        currentLevel = Number(selector.value)
        onPageLoaded();
    }


}

function initialiseGameObject() {
    /*
    gameObject = new Game(new Vec2(5,5), new Vec2(1,5));
    gameObject.messengers.push(new Messenger(new Vec2(1,1), new Vec2(0,1),5));
    gameObject.hackers.push(new Hacker(new Vec2(2,2),new Vec2(0,0)));
*/
    gameObject = getGameOfLevel(currentLevel)
}

function startGameLoop() {

    //request the browser to call the update function before the next repaint
    window.requestAnimationFrame(update);
}

function update(timestamp) {

    //check if this is the first update we do
    if (startTime == null) {
        startTime = timestamp;
        gameStamp = 0;
    }

    delta = timestamp - startTime;
    //perform update and render only if we enter the next second/gameStamp
    if (delta/1000.0 > gameStamp) {
        
        //update the game state and render
        gameObject.step();
        render();

        //increment the gameStamp
        gameStamp++;
    }

    if(gameObject.killedMessengers.length > 0){
        gameResultText.innerHTML = "you Lost :(("
        gameObject.started = false
    }
    else if(gameObject.arrivedMessengers.length == gameObject.messengers.length){
        gameResultText.innerHTML = "you won ! "
        gameObject.started = false
    }

    else window.requestAnimationFrame(update);
}

function render() {
    //render background
    background.render(graphics_context)

    //render hackers and messengers
    gameObject.messengers.forEach(function (messenger) {
        messenger.render(graphics_context, boardInfo);
    });
    gameObject.hackers.forEach(function (hacker) {
        hacker.render(graphics_context, boardInfo);
    });

}