$(document).ready(function() {
    var $flipbook = $("#flipbook");

    function getBookSize() {
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var isMobile = winWidth < 600;

        var width, height;

        if (isMobile) {
            // Single page mode for mobile
            width = Math.min(winWidth * 0.85, 360);
            height = width * (1024 / 466); // Keep original 466x1024 aspect ratio

            if (height > winHeight * 0.85) {
                height = winHeight * 0.85;
                width = height * (466 / 1024);
            }
        } else {
            // Double page mode for desktop
            width = Math.min(winWidth * 0.9, 700);
            height = width * (1024 / 932); // Keep original double aspect ratio

            if (height > winHeight * 0.85) {
                height = winHeight * 0.85;
                width = height * (932 / 1024);
            }
        }

        return {
            width: Math.round(width),
            height: Math.round(height),
            display: isMobile ? 'single' : 'double'
        };
    }

    var initialSize = getBookSize();

    $flipbook.turn({
        width: initialSize.width,
        height: initialSize.height,
        display: initialSize.display,
        autoCenter: true,
        gradients: true,
        elevation: 50
    });

    $(window).on("resize", function() {
        var size = getBookSize();
        if ($flipbook.turn("is")) {
            $flipbook.turn("display", size.display);
            $flipbook.turn("size", size.width, size.height);
        }
    });
});
