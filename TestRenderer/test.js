import {Game,Bot,Hacker,Action} from "../Game/Game.js"
import {Vec2} from "../Game/Vec2.js"
import {ShaderProgram} from "./ShaderProgram.js"
import {readUserCode} from "../Game/ReadUserCode.js"

let canvas = document.getElementById('my_Canvas');
let gl = canvas.getContext('webgl');
let VBO;
let IBO;
let shader;
let frameID = 0;



let game = new Game(new Vec2(5,5), new Vec2(1,5));
game.bots.push(new Bot(new Vec2(1,1), new Vec2(0,1),5));
game.hackers.push(new Hacker(new Vec2(3,3),new Vec2(0,1)));

game.hackers.push(new Hacker(new Vec2(1,0),new Vec2(0,1)));
game.hackers.push(new Hacker(new Vec2(0,1),new Vec2(0,1)));
game.hackers.push(new Hacker(new Vec2(1,3),new Vec2(0,1)));
game.hackers.push(new Hacker(new Vec2(2,1),new Vec2(0,1)));



let gameStarted = false

let textBox = document.getElementById("codeInput");
let applyBtn = document.getElementById('apply');
let gameResultText = document.getElementById("gameResultText")

applyBtn.onclick = ()=>{
    gameStarted = true

    let code = textBox.value;
    console.log("reading \n"+code)
    for(let i = 0;i<game.bots.length;++i){
        readUserCode(game.bots[i],code)
    }
}

const initRenderer = ()=>{
    
    let vertices = [
        -1.0,1.0,0.0,
        -1.0,-1.0,0.0,
        1.0,-1.0,0.0,
        1.0,1.0,0.0 
     ];
     
     let indices = [3,2,1,3,1,0];
     
     VBO = gl.createBuffer();
     
     gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
     
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
     
     gl.bindBuffer(gl.ARRAY_BUFFER, null);
     
     IBO = gl.createBuffer();
     
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
     
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
     
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
     
     let vertCode =
     `
     attribute vec3 coordinates;
     varying mediump vec2 texCoords;
     void main(void) {
         gl_Position = vec4(coordinates, 1.0);
         texCoords = (coordinates.xy + vec2(1.0))/2.0;
     }
     `;
     let fragCode =
     `
     precision mediump float;
     
     uniform vec2 mapSize;

     uniform vec2 destination;

     
     varying vec2 texCoords;
     
     #define MAX_OBJECTS 16
     
     uniform vec2 bots[MAX_OBJECTS];
     uniform int botCount;
     
     uniform vec2 hackers[MAX_OBJECTS];
     uniform int hackerCount;
     
     void main(void) {
         
         gl_FragColor = vec4(texCoords,0,1);
     
         gl_FragColor = vec4(0,0,0,1);
     
         float padding = 0.2;
     
         vec2 coords = (texCoords - vec2(padding)) / (1.0 -padding-padding);
     
         if(coords.x < 0.0 || coords.x > 1.0 || coords.y <0.0 || coords.y > 1.0 ){
             gl_FragColor = vec4(0,0,0,1);
             return;
         }
         
     
         vec2 cellSize = vec2(0,0);
         cellSize.x = 1.0 / mapSize.x;
         cellSize.y = 1.0 / mapSize.y;
     
     
         vec2 locInGrid = vec2(0,0);
         locInGrid.x = coords.x / cellSize.x;
         locInGrid.y = coords.y / cellSize.y;
     
         if(
             locInGrid.x - floor(locInGrid.x) > 0.9 || locInGrid.x - floor(locInGrid.x) < 0.1 || 
             locInGrid.y - floor(locInGrid.y) > 0.9 || locInGrid.y - floor(locInGrid.y) < 0.1
         )
         {
             gl_FragColor = vec4(0,0,1,1);
         }
     
     
         for(int i = 0;i<MAX_OBJECTS;++i){
             if(i<botCount){
                 vec2 botPos = vec2(0,0);
                 botPos = bots[i]  * cellSize;
                 if(length (coords-botPos) < 0.4 * cellSize.x){
                     gl_FragColor = vec4(0,1,0,1);
                 }
             }
         }
     
         for(int i = 0;i<MAX_OBJECTS;++i){
             if(i<hackerCount){
                 vec2 hackerPos = vec2(0,0);
                 hackerPos = hackers[i]  * cellSize;
                 if(length (coords-hackerPos) < 0.4 * cellSize.x){
                     gl_FragColor = vec4(1,0,0,1);
                 }
             }
         }
     
        vec2 destinationPos = destination  * cellSize;
        if(length (coords-destinationPos) < 0.4 * cellSize.x){
            gl_FragColor = vec4(1,1,1,1);
        }
     
     }
        `;
     
     
     
     shader = new ShaderProgram(gl,vertCode,fragCode);
}

initRenderer();


const renderFrame = ()=>{
    shader.useProgram(gl);

    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO); 

    let coord = gl.getAttribLocation(shader.program, "coordinates");

    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(coord);
    
    gl.clearColor(0.5, 0.5, 0.5, 0.9);

    gl.enable(gl.DEPTH_TEST);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.viewport(0,0,canvas.width,canvas.height);





    let mapSizeLocation = gl.getUniformLocation(shader.program,"mapSize");
    if(mapSizeLocation === -1){
        console.log("map size loc wrong")
    }
    gl.uniform2fv(mapSizeLocation,[game.mapSize.x,game.mapSize.y]);

    let destinationLocation = gl.getUniformLocation(shader.program,"destination");
    if(destinationLocation === -1){
        console.log("destination loc wrong")
    }
    gl.uniform2fv(destinationLocation,[game.destination.x,game.destination.y]);


    let botCountLocation = gl.getUniformLocation(shader.program,"botCount");
    if(botCountLocation === -1){
        console.log("bot count loc wrong")
    }
    gl.uniform1i(botCountLocation,game.bots.length);

    for(let i = 0;i<game.bots.length;++i){
        let name = "bots[" + i+"]";
        let loc = gl.getUniformLocation(shader.program,name);
        if(mapSizeLocation === -1){
            console.log("bot loc wrong "+i);
        }
        gl.uniform2fv(loc,[game.bots[i].position.x ,game.bots[i].position.y]);

    }


    let hackerCountLocation = gl.getUniformLocation(shader.program,"hackerCount");
    if(hackerCountLocation === -1){
        console.log("hacker count loc wrong")
    }
    gl.uniform1i(hackerCountLocation,game.hackers.length);

    for(let i = 0;i<game.hackers.length;++i){
        let name = "hackers[" + i+"]";
        let loc = gl.getUniformLocation(shader.program,name);
        if(mapSizeLocation === -1){
            console.log("hacker loc wrong "+i);
        }
        gl.uniform2fv(loc,[game.hackers[i].position.x ,game.hackers[i].position.y]);

    }


    // Draw the triangle
    gl.drawElements(gl.TRIANGLES,6, gl.UNSIGNED_SHORT,0);
}





let onNewFrame = ()=>{
    
    if(gameStarted)
        frameID ++ ;
    if(frameID===60){
        frameID = 0;
        game.step();
        
    }
        
    renderFrame();
    
    requestAnimationFrame(onNewFrame)
    if(game.killedBots.length == game.bots.length){
        gameResultText.innerHTML = "you Lost :(("
        gameStarted = false
    }
    if(game.arrivedBots.length == game.bots.length){
        gameResultText.innerHTML = "you won ! "
        gameStarted = false
    }
}



onNewFrame();