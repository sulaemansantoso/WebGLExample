var handler = document.getElementById('myCanvas');
var gl = handler.getContext('webgl');

gl.clearColor(1.0, 1.0, 0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


function vertexShader(vertPosition, vertColor) {
    return {
        fragColor : [vertColor]
    };
}