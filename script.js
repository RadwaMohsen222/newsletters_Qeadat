$(document).ready(function() {
    var $flipbook = $("#flipbook");

    $flipbook.turn({
        width: 466, 
        height: 512,
        autoCenter: true, 
        display: 'double',
        gradients: true, 
        elevation: 50 
    });

    // Add the hover effect class initially since the book starts closed
    $flipbook.addClass('is-closed');

    // Listen for page turns to disable the hover effect when reading
    $flipbook.bind("turning", function(event, page, view) {
        if (page === 1) {
            // Book is back on the front cover, turn hover back on
            $flipbook.addClass('is-closed');
        } else {
            // Book is open, turn hover off
            $flipbook.removeClass('is-closed');
        }
    });
});
