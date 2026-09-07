$(document).ready(function() {
    var $flipbook = $("#flipbook");

    function initFlipbook() {
        var winW = $(window).width();
        var winH = $(window).height();

        var isMobile = winW < 650;
        var displayMode = isMobile ? 'single' : 'double';
        var targetRatio = isMobile ? (466 / 1024) : (932 / 1024);

        var maxW = winW * 0.9;
        var maxH = winH * 0.9;

        var width = maxW;
        var height = width / targetRatio;

        if (height > maxH) {
            height = maxH;
            width = height * targetRatio;
        }

        if (!$flipbook.data().done) {
            $flipbook.turn({
                width: Math.round(width),
                height: Math.round(height),
                display: displayMode,
                direction: 'rtl', // Right-To-Left page turning for Arabic
                autoCenter: true,
                gradients: false, // Disabled canvas gradients to remove white page overlays
                elevation: 50
            });
            $flipbook.data().done = true;
        } else {
            $flipbook.turn("display", displayMode);
            $flipbook.turn("size", Math.round(width), Math.round(height));
        }
    }

    initFlipbook();

    $(window).on("resize", function() {
        initFlipbook();
    });
});
