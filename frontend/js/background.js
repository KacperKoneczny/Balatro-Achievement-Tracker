// The animated swirl behind the page, inspired by Balatro's main menu.
//
// It's drawn with WebGL, which runs a small program called a "shader" on the
// graphics card. The shader works out the colour of every pixel at the same time,
// so the swirl can move smoothly without slowing the page down.
//
// If WebGL isn't available, nothing is drawn and the plain --page-background
// colour from style.css shows instead.

// Each swirl pixel covers a 4x4 block of screen pixels. That gives it a chunky,
// retro look like the game, and means the graphics card has 16 times less work to do.
var PIXEL_SIZE = 4;

// How fast the swirl turns. Smaller numbers are slower: 0.05 is half this speed,
// 0.2 is twice as fast.
var SPIN_SPEED = 0.1;

// The vertex shader places two triangles that together cover the whole canvas.
var vertexShaderSource = `
attribute vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

// The fragment shader runs once for every pixel and decides its colour.
var fragmentShaderSource = `
precision mediump float;

uniform vec2 resolution; // canvas size in pixels
uniform float time;      // how far the swirl has turned (see SPIN_SPEED)

// The swirl's colours: red, blue, and a dark teal for the shadows.
const vec3 RED = vec3(0.84, 0.25, 0.22);
const vec3 BLUE = vec3(0.0, 0.40, 0.68);
const vec3 DARK = vec3(0.07, 0.12, 0.13);

void main() {
    // Move (0, 0) to the middle of the screen, and scale so the shorter side
    // runs from -0.5 to 0.5. That stops the swirl stretching on wide screens.
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution) / min(resolution.x, resolution.y);
    float t = time;

    // Turn each point around the centre. Points further out turn more,
    // which is what makes the spiral shape.
    float twist = length(uv) * 3.0 - t;
    vec2 p = mat2(cos(twist), sin(twist), -sin(twist), cos(twist)) * uv * 4.0;

    // Nudge the point around a few times so the bands look like stirred paint.
    for (int i = 1; i < 6; i++) {
        float f = float(i);
        p.x += 0.6 / f * sin(f * p.y + t + 0.3 * f);
        p.y += 0.6 / f * cos(f * p.x - t + 0.5 * f);
    }

    // Two wavy patterns (each between 0 and 1): one picks red or blue,
    // the other adds dark shadows.
    float redOrBlue = 0.5 + 0.5 * sin(p.x + p.y);
    float shadow = 0.5 + 0.5 * sin(1.7 * p.x - p.y + t);

    vec3 colour = mix(RED, BLUE, smoothstep(0.35, 0.65, redOrBlue));
    colour = mix(colour, DARK, smoothstep(0.3, 0.8, shadow) * 0.8);
    gl_FragColor = vec4(colour, 1.0);
}
`;

// Turn the shader source code above into something the graphics card can run.
// Returns null (and explains why in the browser console) if anything goes wrong.
function makeShaderProgram(gl) {
    var program = gl.createProgram();
    var sources = [
        [gl.VERTEX_SHADER, vertexShaderSource],
        [gl.FRAGMENT_SHADER, fragmentShaderSource]
    ];

    for (var i = 0; i < sources.length; i++) {
        var shader = gl.createShader(sources[i][0]);
        gl.shaderSource(shader, sources[i][1]);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Background shader error:", gl.getShaderInfoLog(shader));
            return null;
        }
        gl.attachShader(program, shader);
    }

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Background shader error:", gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}

function startBackground() {
    var canvas = document.querySelector(".background");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return; // no WebGL, so the plain background colour shows instead
    }

    var program = makeShaderProgram(gl);
    if (!program) {
        return;
    }
    gl.useProgram(program);

    // The corners of the two triangles. WebGL measures the canvas from -1 to 1
    // in both directions, so these points cover all of it.
    var corners = new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, corners, gl.STATIC_DRAW);
    var position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    var resolution = gl.getUniformLocation(program, "resolution");
    var time = gl.getUniformLocation(program, "time");

    // Some people turn on "reduce motion" in their system settings because moving
    // things make them feel dizzy. For them the swirl is drawn once and stays still.
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var animationId = null;

    function draw(milliseconds) {
        gl.uniform1f(time, (milliseconds / 1000) * SPIN_SPEED);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    // Match the canvas to the window size (divided by PIXEL_SIZE). CSS then
    // stretches it back up to fill the screen.
    function resize() {
        canvas.width = Math.ceil(canvas.clientWidth / PIXEL_SIZE);
        canvas.height = Math.ceil(canvas.clientHeight / PIXEL_SIZE);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resolution, canvas.width, canvas.height);
        if (reduceMotion.matches) {
            draw(0); // resizing clears the canvas, so redraw the still swirl
        }
    }

    // requestAnimationFrame asks the browser to call frame() just before the next
    // screen refresh (usually 60 times a second). The browser pauses it on its own
    // when the tab is hidden, so it doesn't waste battery.
    function frame(milliseconds) {
        draw(milliseconds);
        animationId = requestAnimationFrame(frame);
    }

    function startOrStopAnimation() {
        cancelAnimationFrame(animationId);
        if (reduceMotion.matches) {
            draw(0);
        } else {
            animationId = requestAnimationFrame(frame);
        }
    }

    resize();
    startOrStopAnimation();
    window.addEventListener("resize", resize);
    reduceMotion.addEventListener("change", startOrStopAnimation);
}

startBackground();
