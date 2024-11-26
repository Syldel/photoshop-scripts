// Importer les fonctions depuis shared-functions.jsx
var scriptPath = File($.fileName).parent.fsName; // Répertoire du script en cours
$.evalFile(new File(scriptPath + "/shared-functions.jsx"));

function addMarginsToDocument() {
    if (app.documents.length === 0) {
        alert("Veuillez ouvrir un document d'abord.");
        return;
    }

    var doc = app.activeDocument;

    var imgWidth = doc.width.as("px");
    var imgHeight = doc.height.as("px");

    doc.selection.selectAll();
    doc.selection.copy();
    var nameWithoutExtension = getDocumentNameWithoutExtension(doc);
    var newDocSquare = doc.duplicate(nameWithoutExtension + '_square');

    var newWidth = Math.max(imgWidth, imgHeight);
    var newHeight = Math.max(imgWidth, imgHeight);

    newDocSquare.resizeCanvas(newWidth, newHeight, AnchorPosition.MIDDLECENTER);

    app.runMenuItem(stringIDToTypeID("fitOnScreen"));

    var averageColor = getAverageColor(doc);

    addMargins(newDocSquare, newWidth, newHeight, whiteColor);
    addMargins(newDocSquare, newWidth, newHeight, blackColor);
    addMargins(newDocSquare, newWidth, newHeight, averageColor);
}

// Exécute la fonction
addMarginsToDocument();
