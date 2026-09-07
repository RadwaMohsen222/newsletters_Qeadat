$(document).ready(function() {
    var $flipbook = $("#flipbook");

    function getBookConfig() {
        var winW = $(window).width();
        var winH = $(window).height();

        // Mobile / narrow screen detection
        var isMobile = winW < 650;
        var displayMode = isMobile ? 'single' : 'double';

        // Precise ratios: 466/1024 for single page, 932/1024 for double spread
        var targetRatio = isMobile ? (466 / 1024) : (932 / 1024);

        var maxW = winW * 0.95;
        var maxH = winH * 0.95;

        var width = maxW;
        var height = width / targetRatio;

        // Scale down proportionately if height exceeds viewport
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
                autoCenter: true, // Centers page 1 horizontally
                gradients: false, // Disabled to eliminate animated page shadows
                elevation: 0      // Set to 0 to remove 3D lift shadows
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
