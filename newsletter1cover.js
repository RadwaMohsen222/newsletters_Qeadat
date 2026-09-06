$(document).ready(function () {

    var flipbook = $("#flipbook");


    /* =========================
       START FLIPBOOK
    ========================= */

    flipbook.turn({

        width: 932,
        height: 1024,

        display: "double",

        pages: 7,

        page: 1,

        duration: 600,

        autoCenter: true,

        gradients: true,

        elevation: 10,

        acceleration: true,

        direction: "ltr",

        when: {

            turning: function (event, page) {

                console.log("Turning to page:", page);

            },

            turned: function (event, page) {

                console.log("Currently on page:", page);


                /*
                 * BACK COVER
                 *
                 * Page 7 is the back cover.
                 *
                 * Wait 2 seconds,
                 * then return to page 1.
                 */

                if (page === 7) {

                    setTimeout(function () {

                        flipbook.turn("page", 1);

                    }, 2000);

                }

            }

        }

    });


    /* =========================
       NEXT BUTTON
    ========================= */

    $("#next").click(function () {

        flipbook.turn("next");

    });


    /* =========================
       PREVIOUS BUTTON
    ========================= */

    $("#previous").click(function () {

        flipbook.turn("previous");

    });

});
