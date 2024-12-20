// Importer les fonctions depuis shared-functions.jsx
var scriptPath = File($.fileName).parent.fsName; // Répertoire du script en cours
$.evalFile(new File(scriptPath + "/shared-functions.jsx"));

// Split an image into two, maintaining the original aspect ratio without a max height parameter
function splitImageWithOriginalAspectRatio() {
    if (app.documents.length === 0) {
        alert("Veuillez ouvrir un document d'abord.");
        return;
    }

    var doc = app.activeDocument;
    var nameWithoutExtension = getDocumentNameWithoutExtension(doc);

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
    leftHalf = doc.duplicate(nameWithoutExtension + "_left-half-middle");
    rightHalf = doc.duplicate(nameWithoutExtension + "_right-half-middle");

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
    leftHalf = doc.duplicate(nameWithoutExtension + "_left-half-percent");
    rightHalf = doc.duplicate(nameWithoutExtension + "_right-half-percent");

    //app.activeDocument = leftHalf;
    resizeCanvasWithCustomAnchor(leftHalf, -1/2, 1/3, newWidth, newHeight);

    //app.activeDocument = rightHalf;
    resizeCanvasWithCustomAnchor(rightHalf, 1/2, 1/3, newWidth, newHeight);
}

// Exécute la fonction
splitImageWithOriginalAspectRatio();
