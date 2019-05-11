initWebGL = function() {
    var vertexShaderText = 
    [
        'precision mediump float;',
        '',
        'attribute vec2 vertPosition',
        '',
        'void main()',
        '{',
        '   gl_Position = vec4(vertPosition, 0.0,1.0);',
        '}'
    ].join('\n');

    var fragmentShaderText = [
        'precision mediump float;',
        '',
        'void main()',
        '{',
        '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);', 
        '}'
    ].join('\n');


    var handler = document.getElementById('myCanvas');
    var gl = handler.getContext('webgl');

    if (!gl) {
        gl = handler.getContext('experimental-webgl');
    }
    if (!gl) {
        console.log('your browser sucks');
    }

    gl.clearColor(1.0, 1.0, 0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGEMENT_SHADER);

    gl.ShaderSource(vertexShader, vertexShaderText);
    gl.ShaderSource(vertexShader, vertexShaderText);

    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader,gl_COMPILE_STATUS)){
        console.error('ERROR COMPILING VERTEX SHADER',gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader,gl_COMPILE_STATUS)){
        console.error('ERROR COMPILING FRAGMENT SHADER',gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(vertexShader);
    gl.attachShader(fragmentShader);
    gl.linkProgram(program);
    

}