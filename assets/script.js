'use strict';

var canvas = document.getElementById( 'canvas' );
var ctx = canvas.getContext( '2d' );

canvas.width = 500;
canvas.height = 500;

var triangleBaseSide = 70;
var triangleSide = 100;

var documentCoordinates = {
    centerDocumentPositionX: ( window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth ) / 2,
    centerDocumentPositionY: ( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight ) / 2,
};
var canvasCoordinates = {
    canvasCenterX: canvas.width / 2,
    canvasCenterY: canvas.height / 2,
    canvasPositionLeft: documentCoordinates.centerDocumentPositionX - canvas.width / 2,
    canvasPositionTop: documentCoordinates.centerDocumentPositionY - ( canvas.height / 2 )
};

canvas.style.position = 'absolute';
canvas.style.left = canvasCoordinates.canvasPositionLeft + 'px';
canvas.style.top = canvasCoordinates.canvasPositionTop + 'px';

window.onload = function () {
    document.addEventListener( "mousemove", rotateTriangle, false );
}

function rotateTriangle( event ){
    ctx.save();
    ctx.translate( canvasCoordinates.canvasCenterX, canvasCoordinates.canvasCenterY );
    var triandleTranslation = {
        dx: event.pageX - documentCoordinates.centerDocumentPositionX,
        dy: event.pageY - documentCoordinates.centerDocumentPositionY
    };
    // arctg(y/x)  - angle of rotation (+ PI / 2) - rotate our triangle for correct starting position;
    var rotatingAngle = Math.atan( triandleTranslation.dy / triandleTranslation.dx ) + Math.PI / 2;
    // quarter check
    if ( triandleTranslation.dx < 0 ){
        rotatingAngle += Math.PI;
    }
    ctx.rotate( rotatingAngle );
    ctx.translate( -canvasCoordinates.canvasCenterX, -canvasCoordinates.canvasCenterY );
    drawTriangle();
    ctx.restore();
};

function drawTriangle(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    // intersection of medians is the center of mass of triangle
    var median = Math.sqrt( Math.pow( triangleSide, 2 ) - Math.pow( triangleBaseSide, 2 ) / 4 );
    var triangleCoordinates = {
        trianglePointTopX: canvasCoordinates.canvasCenterX,
        trianglePointTopY: canvasCoordinates.canvasCenterY - median * 2 / 3,
        trianglePointBottomLeftX: canvasCoordinates.canvasCenterX - triangleBaseSide / 2,
        trianglePointBottomRightX: canvasCoordinates.canvasCenterX + triangleBaseSide / 2,
        trianglePointBottomY: canvasCoordinates.canvasCenterY + median / 3
    };
    ctx.beginPath();
    ctx.moveTo( triangleCoordinates.trianglePointTopX, triangleCoordinates.trianglePointTopY );
    ctx.lineTo( triangleCoordinates.trianglePointBottomLeftX, triangleCoordinates.trianglePointBottomY );
    ctx.lineTo( triangleCoordinates.trianglePointBottomRightX, triangleCoordinates.trianglePointBottomY );
    ctx.closePath();
    ctx.stroke();
}