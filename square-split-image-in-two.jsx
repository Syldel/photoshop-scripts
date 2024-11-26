// Importer les fonctions depuis shared-functions.jsx
var scriptPath = File($.fileName).parent.fsName; // Répertoire du script en cours
$.evalFile(new File(scriptPath + "/shared-functions.jsx"));

// Split an image into two
function splitImageSquare() {
    if (app.documents.length === 0) {
        alert("Veuillez ouvrir un document d'abord.");
        return;
    }

    var doc = app.activeDocument;

    // Calculer le ratio de l'image actuelle
    var imgWidth = doc.width.as("px");
    var imgHeight = doc.height.as("px");
    var imgRatio = imgWidth / imgHeight;
    
    if (imgRatio < 1 ) {
        alert('Document should be landscape');
        return;
    }

    doc.selection.selectAll();
    doc.selection.copy();
    var nameWithoutExtension = getDocumentNameWithoutExtension(doc);
    var nameWithoutExtensionSquare = nameWithoutExtension + '_square';
    var newDocSquare = doc.duplicate(nameWithoutExtensionSquare + '_square');
    newDocSquare.resizeCanvas(imgHeight, imgHeight, AnchorPosition.MIDDLECENTER);

    app.activeDocument = doc;

    var originalWidth = doc.width;
    var newWidth = originalWidth / 2;
    var newHeight = newWidth;

    /* ***************************************************** */
    // var leftHalf = doc.duplicate("Left Half Top");
    // var rightHalf = doc.duplicate("Right Half Top");

    // app.activeDocument = leftHalf;
    // leftHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.TOPLEFT);

    // app.activeDocument = rightHalf;
    // rightHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.TOPRIGHT);

    /* ***************************************************** */
    leftHalf = doc.duplicate(nameWithoutExtensionSquare + "_left-half-middle");
    rightHalf = doc.duplicate(nameWithoutExtensionSquare + "_right-half-middle");

    app.activeDocument = leftHalf;
    leftHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.MIDDLELEFT);

    app.runMenuItem(stringIDToTypeID("fitOnScreen"));

    app.activeDocument = rightHalf;
    rightHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.MIDDLERIGHT);

    app.runMenuItem(stringIDToTypeID("fitOnScreen"));

    /* ***************************************************** */
    // leftHalf = doc.duplicate("Left Half Bottom");
    // rightHalf = doc.duplicate("Right Half Bottom");

    // app.activeDocument = leftHalf;
    // leftHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.BOTTOMLEFT);

    // app.activeDocument = rightHalf;
    // rightHalf.resizeCanvas(newWidth, newHeight, AnchorPosition.BOTTOMRIGHT);

    /* ***************************************************** */
    leftHalf = doc.duplicate(nameWithoutExtensionSquare + "_left-half-percent");
    rightHalf = doc.duplicate(nameWithoutExtensionSquare + "_right-half-percent");

    //app.activeDocument = leftHalf;
    resizeCanvasWithCustomAnchor(leftHalf, -1/2, -1/3, newWidth, newHeight);

    app.runMenuItem(stringIDToTypeID("fitOnScreen"));

    //app.activeDocument = rightHalf;
    resizeCanvasWithCustomAnchor(rightHalf, 1/2, -1/3, newWidth, newHeight);

    app.runMenuItem(stringIDToTypeID("fitOnScreen"));
}

// Exécute la fonction
splitImageSquare();
