var blackColor = new SolidColor();
blackColor.rgb.red = 0;
blackColor.rgb.green = 0;
blackColor.rgb.blue = 0;

var whiteColor = new SolidColor();
whiteColor.rgb.red = 255;
whiteColor.rgb.green = 255;
whiteColor.rgb.blue = 255;

/* Récupère le nom d'un document Photoshop sans l'extension.
* 
* @param {Document} doc - Le document Photoshop dont on veut le nom.
* @returns {string} - Le nom du document sans extension.
*/
function getDocumentNameWithoutExtension(doc) {
  if (!doc || !(doc instanceof Document)) {
    throw new Error("Veuillez fournir un document valide.");
  }
  var fullName = doc.name; // Nom complet avec extension
  return cleanString(fullName.replace(/\.[^\.]+$/, "")); // Supprime l'extension
}

/**
 * Nettoie une chaîne de caractères :
 * - Remplace les espaces par des tirets.
 * - Supprime les caractères spéciaux.
 * 
 * @param {string} input - La chaîne de caractères à nettoyer.
 * @returns {string} - La chaîne nettoyée.
 */
function cleanString(input) {
    if (typeof input !== "string") {
        throw new Error("L'entrée doit être une chaîne de caractères.");
    }

    // Remplacer les espaces par des tirets
    var spacesToDashes = input.replace(/\s+/g, "-");

    // Supprimer les caractères spéciaux (conserve les lettres, chiffres, et tirets)
    var cleaned = spacesToDashes.replace(/[^a-zA-Z0-9_\-]/g, "");

    return cleaned;
}

/**
 * Convertit un SolidColor en une chaîne hexadécimale.
 * 
 * @param {SolidColor} color - La couleur SolidColor à convertir.
 * @returns {string} - La chaîne hexadécimale formatée.
 */
function solidColorToHexString(color) {
    if (!(color instanceof SolidColor)) {
        throw new Error("L'entrée doit être un objet SolidColor.");
    }

    // Convertir chaque composant RVB en hexadécimal
    var red = Math.round(color.rgb.red).toString(16).toUpperCase();
    var green = Math.round(color.rgb.green).toString(16).toUpperCase();
    var blue = Math.round(color.rgb.blue).toString(16).toUpperCase();

    // Ajouter des zéros initiaux si nécessaire (e.g., "F" devient "0F")
    if (red.length < 2) red = "0" + red;
    if (green.length < 2) green = "0" + green;
    if (blue.length < 2) blue = "0" + blue;

    // Construire et retourner la chaîne hexadécimale
    return "#" + red + green + blue;
}

// Fonction pour ajouter des marges de couleur
function addMargins(targetDoc, pWidth, pHeight, color, docNameSuffix) {
    docNameSuffix = docNameSuffix ? docNameSuffix : solidColorToHexString(color).replace('#', '');
    var nameWithoutExtension = getDocumentNameWithoutExtension(targetDoc);
    var newDoc = targetDoc.duplicate(nameWithoutExtension + '_' + docNameSuffix);

    newDoc.resizeCanvas(pWidth, pHeight, AnchorPosition.MIDDLECENTER);

    newDoc.activeLayer.name = "Background";

    app.backgroundColor = color;

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

// Redimensionner avec un point d'ancrage basé sur des pourcentages
function resizeCanvasWithCustomAnchor(doc, percentX, percentY, newWidth, newHeight) {
    app.activeDocument = doc;
    doc.selection.selectAll();
    doc.selection.copy();
    doc.paste();

    var offsetX = (doc.width - newWidth) * percentX;
    var offsetY = (doc.height - newHeight) * percentY;

    doc.resizeCanvas(newWidth, newHeight);
    doc.activeLayer.translate(-offsetX, -offsetY);
}

/**
 * Calcule la couleur moyenne d'un calque ou d'un document actif.
 * @returns {SolidColor} La couleur moyenne sous forme d'objet SolidColor.
 */
function getAverageColor(doc) {
    app.activeDocument = doc;

    // Créer un instantané de l'état actuel
    doc.activeHistoryState = doc.historyStates[doc.historyStates.length - 1];

    // Dupliquer le document pour éviter de modifier l'original
    var tempDoc = doc.duplicate();

    // Redimensionner le document à 1x1 pixel pour obtenir une couleur moyenne
    tempDoc.resizeImage(UnitValue(1, "px"), UnitValue(1, "px"), undefined, ResampleMethod.BICUBIC);

    // Lire la couleur du pixel unique
    var pixelColor = tempDoc.colorSamplers.add([0.5, 0.5]).color;

    // Supprimer le document temporaire
    tempDoc.close(SaveOptions.DONOTSAVECHANGES);

    // Retourner la couleur moyenne
    return pixelColor;
}