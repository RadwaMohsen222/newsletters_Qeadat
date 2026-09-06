window.FlipbookSettings = {

    options: {

        width: 932,
        height: 1024,

        display: "double",
        page: 1,
        pages: 7,

        autoCenter: true,
        animatedAutoCenter: true,

        duration: 600,
        elevation: "10%",

        gradients: true,
        smartFlip: true,
        swipe: true,

        responsive: true,
        autoScaleContent: true,

        acceleration: true,
        hover: true,

        turnCorners: "l,r",
        pageMargin: "0px 0px",

        when: {

            turned: function (event, page) {

                // When the back cover is reached,
                // wait 2 seconds and restart from the front.

                if (page === 7) {

                    setTimeout(function () {

                        $("#flipbook").turn("page", 1);

                    }, 2000);

                }
            }
        }
    }
};
