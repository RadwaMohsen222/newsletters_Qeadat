$(document).ready(function() {
    $("#flipbook").turn({
        // Width is 466 * 2 (for two pages facing each other)
        width: 932,
        height: 1024,
        // Automatically centers the book when it opens/closes
        autoCenter: true, 
        // Shows two pages at a time
        display: 'double',
        // Adds realistic shadows to the flipping animation
        gradients: true, 
        // 3D elevation during the turn
        elevation: 50 
    });
});
