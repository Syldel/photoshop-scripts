// Split an image into two, maintaining the original aspect ratio without a max height parameter
function splitImageWithOriginalAspectRatio() {
    if (app.documents.length === 0) {
        alert("Veuillez ouvrir un document d'abord.");
        return;
    }

    var doc = app.activeDocument;

    var originalWidth = doc.width;
    var originalHeight = doc.height;
    var aspectRatio = originalWidth / originalHeight;

    var width = doc.width;
    // var height = doc.height * aspectRatio;
    var newWidth = Math.floor(width / 2);
    var newHeight = newWidth / aspectRatio;

    /* ***************************************************** */
    // var leftHalf = doc.duplicate("Left Half Top");
    // var rightHalf = doc.duplicate("Right Half Top");

    // app.activeDocument = leftHalf;
    // leftHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.TOPLEFT);

    // app.activeDocument = rightHalf;
    // rightHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.TOPRIGHT);

    /* ***************************************************** */
    leftHalf = doc.duplicate("Left Half Middle");
    rightHalf = doc.duplicate("Right Half Middle");

    app.activeDocument = leftHalf;
    leftHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.MIDDLELEFT);

    app.activeDocument = rightHalf;
    rightHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.MIDDLERIGHT);

    /* ***************************************************** */
    // leftHalf = doc.duplicate("Left Half Bottom");
    // rightHalf = doc.duplicate("Right Half Bottom");

    // app.activeDocument = leftHalf;
    // leftHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.BOTTOMLEFT);

    // app.activeDocument = rightHalf;
    // rightHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.BOTTOMRIGHT);

    /* ***************************************************** */
    leftHalf = doc.duplicate("Left Half 33%");
    rightHalf = doc.duplicate("Right Half 33%");

    //app.activeDocument = leftHalf;
    resizeCanvasWithCustomAnchor(leftHalf, -1/2, 1/3, newWidth, newHeight);

    //app.activeDocument = rightHalf;
    resizeCanvasWithCustomAnchor(rightHalf, 1/2, 1/3, newWidth, newHeight);
}

// Exécute la fonction
splitImageWithOriginalAspectRatio();


// Redimensionner avec un point d'ancrage basé sur des pourcentages
function resizeCanvasWithCustomAnchor(doc, percentX, percentY, newWidth, newHeight) {
    app.activeDocument = doc;
    doc.selection.selectAll();
    doc.selection.copy();
    doc.paste();

    var offsetX = roundToTwoDecimals((doc.width - newWidth) * percentX);
    var offsetY = roundToTwoDecimals((doc.height - newHeight) * percentY);

    doc.resizeCanvas(newWidth, newHeight);
    doc.activeLayer.translate(-offsetX, -offsetY);
}

function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
}