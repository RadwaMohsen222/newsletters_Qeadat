$(document).ready(function() {
    $("#flipbook").turn({
        // Dimensions scaled down by exactly half
        width: 466, 
        height: 512,
        autoCenter: true, 
        display: 'double',
        gradients: true, 
        elevation: 50 
    });
});
