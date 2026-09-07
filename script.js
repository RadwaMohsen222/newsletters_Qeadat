$(document).ready(function() {
    var $flipbook = $("#flipbook");

    $flipbook.turn({
        width: 466, 
        height: 512,
        autoCenter: true, // This shifts the book to the middle when on page 1
        display: 'double',
        gradients: true, 
        elevation: 50 
    });

    $flipbook.addClass('is-closed');

    $flipbook.bind("turning", function(event, page, view) {
        if (page === 1) {
            $flipbook.addClass('is-closed');
        } else {
            $flipbook.removeClass('is-closed');
        }
    });
});
