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

    // Fonction pour ajouter des marges de couleur
    function addMargins(targetDoc, pWidth, pHeight, color) {
        var newDoc = targetDoc.duplicate();

        newDoc.resizeCanvas(pWidth, pHeight, AnchorPosition.MIDDLECENTER);

        newDoc.activeLayer.name = "Background";

        app.backgroundColor.rgb.red = color === "white" ? 255 : 0;
        app.backgroundColor.rgb.green = color === "white" ? 255 : 0;
        app.backgroundColor.rgb.blue = color === "white" ? 255 : 0;

        newDoc.selection.fill(app.backgroundColor);
        newDoc.selection.deselect();

        newDoc.artLayers.add();
        newDoc.activeLayer.name = "Image";
        var pastedLayer = newDoc.paste();
        var percentResizeLayer = 90;
        pastedLayer.resize(percentResizeLayer, percentResizeLayer, AnchorPosition.MIDDLECENTER);
        centerPastedLayer(newDoc, pastedLayer);

        app.runMenuItem(stringIDToTypeID("fitOnScreen"));
    }

    function centerPastedLayer(doc, pastedLayer) {
        var docWidth = doc.width.as("px");
        var docHeight = doc.height.as("px");

        var pastedBounds = pastedLayer.bounds;
        var pastedWidth = pastedBounds[2].as("px") - pastedBounds[0].as("px");
        var pastedHeight = pastedBounds[3].as("px") - pastedBounds[1].as("px");

        var deltaX = (docWidth - pastedWidth) / 2 - pastedBounds[0].as("px");
        var deltaY = (docHeight - pastedHeight) / 2 - pastedBounds[1].as("px");

        pastedLayer.translate(deltaX, deltaY);
    }

    if (imgRatio > landscapeRatio) {
        doc.selection.selectAll();
        doc.selection.copy();
        var newDoc2 = doc.duplicate();

        var targetWidth = imgHeight * landscapeRatio;
        var newRatio = imgWidth / targetWidth;

        newDoc2.resizeCanvas(targetWidth, imgHeight, AnchorPosition.MIDDLECENTER);

        app.runMenuItem(stringIDToTypeID("fitOnScreen"));

        var newWidth = targetWidth * newRatio;
        var newHeight = imgHeight * newRatio;
        addMargins(newDoc2, newWidth, newHeight, "white");
        addMargins(newDoc2, newWidth, newHeight, "black");

    } else if (imgRatio < portraitRatio) {
        doc.selection.selectAll();
        doc.selection.copy();
        var newDoc2 = doc.duplicate();

        var targetHeight = imgWidth / portraitRatio;
        var newRatio = imgHeight / targetHeight;

        newDoc2.resizeCanvas(imgWidth, targetHeight, AnchorPosition.MIDDLECENTER);

        app.runMenuItem(stringIDToTypeID("fitOnScreen"));

        var newWidth = imgWidth * newRatio;
        var newHeight = targetHeight * newRatio;
        addMargins(newDoc2, newWidth, newHeight, "white");
        addMargins(newDoc2, newWidth, newHeight, "black");

    } else {
        alert("L'image est déjà dans le bon format.");
    }
} else {
    alert("Aucun document ouvert dans Photoshop.");
}