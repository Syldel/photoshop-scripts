// Importer les fonctions depuis shared-functions.jsx
var scriptPath = File($.fileName).parent.fsName; // Répertoire du script en cours
$.evalFile(new File(scriptPath + "/shared-functions.jsx"));

// Script Photoshop JSX pour recadrage et ajout de marges
if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // Dimensions et ratios
    var landscapeRatio = 1.91; // ratio paysage maximum
    var portraitRatio = 0.8; // ratio portrait maximum (4:5)

    // Calculer le ratio de l'image actuelle
    var imgWidth = doc.width.as("px");
    var imgHeight = doc.height.as("px");
    var imgRatio = imgWidth / imgHeight;

    var nameWithoutExtension = getDocumentNameWithoutExtension(doc);

    if (imgRatio > landscapeRatio) {
        doc.selection.selectAll();
        doc.selection.copy();
        var newDocCrop = doc.duplicate(nameWithoutExtension + '_crop');

        var targetWidth = imgHeight * landscapeRatio;
        var newRatio = imgWidth / targetWidth;

        newDocCrop.resizeCanvas(targetWidth, imgHeight, AnchorPosition.MIDDLECENTER);

        app.runMenuItem(stringIDToTypeID("fitOnScreen"));

        var newWidth = targetWidth * newRatio;
        var newHeight = imgHeight * newRatio;
        addMargins(newDocCrop, newWidth, newHeight, whiteColor);
        addMargins(newDocCrop, newWidth, newHeight, blackColor);

    } else if (imgRatio < portraitRatio) {
        doc.selection.selectAll();
        doc.selection.copy();
        var newDocCrop = doc.duplicate(nameWithoutExtension + '_crop');

        var targetHeight = imgWidth / portraitRatio;
        var newRatio = imgHeight / targetHeight;

        newDocCrop.resizeCanvas(imgWidth, targetHeight, AnchorPosition.MIDDLECENTER);

        app.runMenuItem(stringIDToTypeID("fitOnScreen"));

        var newWidth = imgWidth * newRatio;
        var newHeight = targetHeight * newRatio;
        addMargins(newDocCrop, newWidth, newHeight, whiteColor);
        addMargins(newDocCrop, newWidth, newHeight, blackColor);

    } else {
        alert("L'image est d\u00E9j\u00E0 au bon format.");
    }
} else {
    alert("Aucun document ouvert dans Photoshop.");
}