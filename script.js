$(document).ready(function() {
    var $flipbook = $("#flipbook");

    function getBookSize() {
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var isMobile = winWidth < 600;

        var width, height;

        if (isMobile) {
            width = Math.min(winWidth * 0.9, 360);
            height = width * (1024 / 466);

            if (height > winHeight * 0.9) {
                height = winHeight * 0.9;
                width = height * (466 / 1024);
            }
        } else {
            width = Math.min(winWidth, 700);
            height = width * (1024 / 932);

            if (height > winHeight) {
                height = winHeight;
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
        autoCenter: false, // Disabled so page boundaries fit tightly
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
