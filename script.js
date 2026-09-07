$(document).ready(function() {
    var $flipbook = $("#flipbook");

    function getBookConfig() {
        var winW = $(window).width();
        var winH = $(window).height();

        var isMobile = winW < 650;
        var displayMode = isMobile ? 'single' : 'double';

        var targetRatio = isMobile ? (466 / 1024) : (932 / 1024);

        var maxW = winW * 0.95;
        var maxH = winH * 0.95;

        var width = maxW;
        var height = width / targetRatio;

        if (height > maxH) {
            height = maxH;
            width = height * targetRatio;
        }

        return {
            width: Math.round(width),
            height: Math.round(height),
            display: displayMode
        };
    }

    function applyLayout() {
        var config = getBookConfig();

        if (!$flipbook.data().done) {
            $flipbook.turn({
                width: config.width,
                height: config.height,
                display: config.display,
                autoCenter: true,
                gradients: false, // Disables shadow overlays during flip
                elevation: 0      // Disables 3D shadow depth
            });
            $flipbook.data().done = true;
        } else {
            $flipbook.turn("display", config.display);
            $flipbook.turn("size", config.width, config.height);
        }
    }

    applyLayout();

    $(window).on("resize", function() {
        applyLayout();
    });
});
