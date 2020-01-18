import {Game,Bot,Hacker,Action} from "../Game/Game.js"
import {Vec2} from "../Game/Vec2.js"

export class ShaderProgram{
    constructor(gl,vertexShaderSource,fragmentShaderSource){
        var vertexShader = new VertexShader(gl,vertexShaderSource);
        var fragmentShader = new FragmentShader(gl,fragmentShaderSource);

        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader.shader);
        gl.attachShader(this.program, fragmentShader.shader);
        gl.linkProgram(this.program);
        this.valid = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!this.valid) {
            console.log(gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
        }
        // these two functions are not defined in ShaderProgram
        // which means, this class should never be instantiated
        // must define subclasses
        //this.setUniformLocations(gl);
        //this.setAttribLocations(gl);
    }
    useProgram(gl){
        gl.useProgram(this.program);
    }

}

export class VertexShader{
    constructor(gl,source){
        this.shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this.shader, source);
        gl.compileShader(this.shader);
        this.valid = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS);

        if (!this.valid) {
            console.log(gl.getShaderInfoLog(this.shader));  // eslint-disable-line
            gl.deleteShader(this.shader);
        }
    }
}

export class FragmentShader{
    constructor(gl,source){
        this.shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this.shader, source);
        gl.compileShader(this.shader);
        this.valid = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS);

        if (!this.valid) {
            console.log(gl.getShaderInfoLog(this.shader));  // eslint-disable-line
            gl.deleteShader(this.shader);
        }
    }
}
      
var canvas = document.getElementById('my_Canvas');
let gl = canvas.getContext('webgl');

/*========== Defining and storing the geometry =========*/

var vertices = [
   -0.5,0.5,0.0,
   -0.5,-0.5,0.0,
   0.5,-0.5,0.0,
   0.5,0.5,0.0 
];

let indices = [3,2,1,3,1,0];

// Create an empty buffer object to store vertex buffer
var vertex_buffer = gl.createBuffer();

// Bind appropriate array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// Create an empty buffer object to store Index buffer
var Index_Buffer = gl.createBuffer();

// Bind appropriate array buffer to it
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

/*====================== Shaders =======================*/

// Vertex shader source code
var vertCode =
`
attribute vec3 coordinates;
varying mediump vec2 texCoords;
void main(void) {
    gl_Position = vec4(coordinates, 1.0);
    texCoords = coordinates.xy + vec2(0.5);
}
`;
// Fragment shader source code
var fragCode =
`
precision mediump float;

uniform vec2 mapSize;

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


}
   `;



let shader = new ShaderProgram(gl,vertCode,fragCode);


let game = new Game(new Vec2(5,5));
game.bots.push(new Bot(new Vec2(1,1), new Vec2(0,1),5));
game.hackers.push(new Hacker(new Vec2(3,3),new Vec2(0,1)));

let frameID = 0;

game.bots[0].nextMove = (state)=>{
    return new Action(new Vec2(0,1),false)
}

let render = ()=>{
    
    frameID ++ ;
    if(frameID===60){
        frameID = 0;
        game.step();
    }
        
    shader.useProgram(gl);

    // Use the combined shader program object
    //gl.useProgram(shaderProgram);

    /* ======= Associating shaders to buffer objects =======*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Bind index buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer); 

    // Get the attribute location
    var coord = gl.getAttribLocation(shader.program, "coordinates");

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    /*============= Drawing the Quad ================*/

    // Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 0.9);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set the view port
    gl.viewport(0,0,canvas.width,canvas.height);





    let mapSizeLocation = gl.getUniformLocation(shader.program,"mapSize");
    if(mapSizeLocation === -1){
        console.log("map size loc wrong")
    }
    gl.uniform2fv(mapSizeLocation,[game.mapSize.x,game.mapSize.y]);


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
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
    
    requestAnimationFrame(render)
}



render();