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

        var w = Math.round(width);
        var h = Math.round(height);

        if (!$flipbook.data().done) {
            $flipbook.turn({
                width: w,
                height: h,
                display: displayMode,
                direction: 'rtl', // Native turn.js Arabic flipping
                autoCenter: true,
                gradients: false, // Disables shadow gradient overlays
                elevation: 0      // Removes 3D peel shadows
            });
            $flipbook.data().done = true;
        } else {
            $flipbook.turn("display", displayMode);
            $flipbook.turn("size", w, h);
        }
    }

    initFlipbook();

    $(window).on("resize", function() {
        initFlipbook();
    });
});
