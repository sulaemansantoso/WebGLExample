initWebGL = function() {
    var vertexShaderText = 
    [
        'precision mediump float;',
        '',
        'attribute vec2 vertPosition;',
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
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
        console.error('ERROR COMPILING VERTEX SHADER',gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
        console.error('ERROR COMPILING FRAGMENT SHADER',gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program', gl.getProgramInfoLog(program));
        return;
    }

    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
        console.error('ERROR validating program', gl.getProgramInfoLog(program));
        return;
    }


    //Create buffer
    var triangle_vertices = [
        //X,Y
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5,

        0.1, 0.5,
        1.1, 0.5,
        0.6, -0.5
    ];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject );
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangle_vertices),gl.STATIC_DRAW);

    var positionAtrribLocation = gl.getAttribLocation(program,'vertPosition');
    gl.vertexAttribPointer(
        positionAtrribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.enableVertexAttribArray(positionAtrribLocation);


    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    /*
        var loop = function() {
            updateworld();
            renderworld();
            if (running) {
                requestAnimationFrame(loop);
            }
            requestAnimationFrame(loop);
        }
    */

}