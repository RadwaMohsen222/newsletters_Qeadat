const book = document.getElementById("book");

const frontCover = document.getElementById("frontCover");
const middleFlip = document.getElementById("middleFlip");
const backFlip = document.getElementById("backFlip");

const leftPageImage = document.getElementById("leftPageImage");
const rightPageImage = document.getElementById("rightPageImage");

const spine = document.getElementById("spine");

const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");


/*
STATES

0 = front cover
1 = page1 + page2
2 = page3 + page4
3 = back cover
*/

let state = 0;
let animating = false;
let resetTimer = null;


/* =========================================
   INITIAL STATE
========================================= */

function resetBook() {

    clearTimeout(resetTimer);

    state = 0;
    animating = false;

    book.className = "book closed";

    frontCover.classList.remove("flipped");

    middleFlip.classList.remove(
        "active",
        "flipped"
    );

    backFlip.classList.remove(
        "active",
        "flipped"
    );

    spine.classList.remove("visible");

    leftPageImage.src = "page1.jpg";
    rightPageImage.src = "page2.jpg";

    previousButton.classList.remove("visible");
    nextButton.classList.remove("visible");

}


/* =========================================
   OPEN FRONT COVER
========================================= */

function openBook() {

    if (animating || state !== 0) return;

    animating = true;

    book.classList.remove("closed");
    book.classList.add("open");

    /*
    page1 / page2 already sit under cover
    */

    leftPageImage.src = "page1.jpg";
    rightPageImage.src = "page2.jpg";

    requestAnimationFrame(() => {

        frontCover.classList.add("flipped");

    });


    setTimeout(() => {

        state = 1;
        animating = false;

        nextButton.classList.add("visible");
        previousButton.classList.add("visible");

    }, 1000);

}


/* =========================================
   PAGE 1+2 -> PAGE 3+4
========================================= */

function goToSecondSpread() {

    if (animating || state !== 1) return;

    animating = true;

    /*
    page4 sits underneath the turning page.
    Page2 turns over and its back is page3.
    */

    rightPageImage.src = "page4.jpg";

    middleFlip.classList.add("active");


    requestAnimationFrame(() => {

        middleFlip.classList.add("flipped");

    });


    setTimeout(() => {

        /*
        after animation we can make the fixed
        spread page3 + page4
        */

        leftPageImage.src = "page3.jpg";
        rightPageImage.src = "page4.jpg";

        state = 2;
        animating = false;

    }, 1000);

}


/* =========================================
   PAGE 3+4 -> BACK COVER
========================================= */

function closeToBack() {

    if (animating || state !== 2) return;

    animating = true;

    nextButton.classList.remove("visible");
    previousButton.classList.remove("visible");

    backFlip.classList.add("active");

    spine.classList.add("visible");


    requestAnimationFrame(() => {

        backFlip.classList.add("flipped");

    });


    /*
    Move the single closed book toward
    the centre as page4 finishes turning.
    */

    setTimeout(() => {

        book.classList.remove("open");
        book.classList.add("showing-back");

    }, 500);


    setTimeout(() => {

        spine.classList.remove("visible");

        state = 3;
        animating = false;

        /*
        Stay on back cover for 2 seconds.
        */

        resetTimer = setTimeout(() => {

            returnToFront();

        }, 2000);

    }, 1000);

}


/* =========================================
   BACK -> FRONT
========================================= */

function returnToFront() {

    if (animating) return;

    animating = true;

    /*
    Small 3D movement so it feels as though
    the closed book turns around rather than
    instantly teleporting, because teleporting
    books remain disappointingly rare.
    */

    book.style.transition =
        "transform 700ms cubic-bezier(.55,.05,.45,.95), opacity 300ms ease";

    book.style.transform =
        "translateX(calc(var(--page-width) / 2)) rotateY(90deg)";


    setTimeout(() => {

        /*
        At 90 degrees the book is almost invisible,
        so change to the front safely here.
        */

        frontCover.classList.remove("flipped");
        middleFlip.classList.remove("active", "flipped");
        backFlip.classList.remove("active", "flipped");

        leftPageImage.src = "page1.jpg";
        rightPageImage.src = "page2.jpg";

        book.className = "book closed";

        book.style.transition =
            "transform 700ms cubic-bezier(.55,.05,.45,.95), filter 350ms ease";

        book.style.transform =
            "translateX(calc(var(--page-width) / -2)) rotateY(-90deg)";


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                book.style.transform =
                    "translateX(calc(var(--page-width) / -2)) rotateY(0deg)";

            });

        });


        setTimeout(() => {

            /*
            Return transforms to CSS control.
            */

            book.style.transition = "";
            book.style.transform = "";

            state = 0;
            animating = false;

        }, 750);

    }, 700);

}


/* =========================================
   PREVIOUS
========================================= */

function previousPage() {

    if (animating) return;


    /* page3/page4 -> page1/page2 */

    if (state === 2) {

        animating = true;

        middleFlip.classList.remove("flipped");

        setTimeout(() => {

            leftPageImage.src = "page1.jpg";
            rightPageImage.src = "page2.jpg";

            middleFlip.classList.remove("active");

            state = 1;
            animating = false;

        }, 1000);

        return;
    }


    /* page1/page2 -> front cover */

    if (state === 1) {

        animating = true;

        frontCover.classList.remove("flipped");

        setTimeout(() => {

            book.classList.remove("open");
            book.classList.add("closed");

            nextButton.classList.remove("visible");
            previousButton.classList.remove("visible");

            state = 0;
            animating = false;

        }, 800);

    }

}


/* =========================================
   CONTROLS
========================================= */


/* Click front cover to open */

frontCover.addEventListener("click", () => {

    if (state === 0) {
        openBook();
    }

});


/* Next */

nextButton.addEventListener("click", () => {

    if (state === 1) {
        goToSecondSpread();
    }

    else if (state === 2) {
        closeToBack();
    }

});


/* Previous */

previousButton.addEventListener("click", previousPage);


/* Keyboard arrows */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        if (state === 0) {
            openBook();
        }

        else if (state === 1) {
            goToSecondSpread();
        }

        else if (state === 2) {
            closeToBack();
        }

    }


    if (event.key === "ArrowLeft") {

        previousPage();

    }

});


/* Start */

resetBook();
