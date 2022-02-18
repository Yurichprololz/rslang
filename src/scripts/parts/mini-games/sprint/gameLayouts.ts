const prevGame = `<main class="main bg-dark text-white">
<div class=" container sprint-game d-flex align-items-center justify-content-center">
    <div class="col-8  bg-midi-dack h-50 d-flex flex-column align-items-center justify-content-center">
        <p class="h1">Приготовьтесь:</p>
        <div class="count-container">
            <p class="h2 three-to-one">8</p>
        </div>
    </div>
</div>    
</main>`;
// <main class="main bg-dark text-white"></main>
const game = `
<div class=" container sprint-game d-flex align-items-center justify-content-center">
    <div class="col-8 bg-midi-dack d-flex flex-column align-items-start">
        <button type="button" class="btn-close btn-close-white close-game" aria-label="Close"></button>
        <div class="row col-12 sensors-row align-items-center">
            <div class="row col-4 d-flex align-items-center justify-content-center">
                <div class="col-2 text-center mx-2"> 
                    <p class="h2 px-1 ranking"></p>
                </div>
                <div class="col-2 text-center mx-2"> 
                    <p class="h2 px-1 score-rate"></p>
                </div>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="6vmin" height="6vmin" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet" id="f1">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="none" stroke="black" stroke-width="100">
                        <path d="M2426 5099 c-19 -15 -216 -398 -672 -1310 -354 -709 -644 -1298 -644
                        -1309 0 -32 21 -67 47 -79 16 -8 164 -11 470 -11 352 0 444 -3 440 -12 -2 -7
                        -219 -522 -481 -1144 -262 -622 -476 -1141 -476 -1153 0 -30 52 -81 82 -81 13
                        0 34 7 46 16 21 14 2714 3205 2755 3264 24 35 21 76 -8 105 l-24 25 -522 0
                        c-413 0 -520 3 -516 13 2 6 223 356 489 777 267 421 490 775 496 787 20 36 14
                        82 -13 108 l-24 25 -709 0 c-708 0 -709 0 -736 -21z"/>
                    </g>
                </svg>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="6vmin" height="6vmin" viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet" id="f2">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="none" stroke="black" stroke-width="100">
                    <path d="M2426 5099 c-19 -15 -216 -398 -672 -1310 -354 -709 -644 -1298 -644
                    -1309 0 -32 21 -67 47 -79 16 -8 164 -11 470 -11 352 0 444 -3 440 -12 -2 -7
                    -219 -522 -481 -1144 -262 -622 -476 -1141 -476 -1153 0 -30 52 -81 82 -81 13
                    0 34 7 46 16 21 14 2714 3205 2755 3264 24 35 21 76 -8 105 l-24 25 -522 0
                    c-413 0 -520 3 -516 13 2 6 223 356 489 777 267 421 490 775 496 787 20 36 14
                    82 -13 108 l-24 25 -709 0 c-708 0 -709 0 -736 -21z"/>
                    </g>
                </svg>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="6vmin" height="6vmin" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet" id="f3">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="none" stroke="black" stroke-width="100">
                    <path d="M2426 5099 c-19 -15 -216 -398 -672 -1310 -354 -709 -644 -1298 -644
                    -1309 0 -32 21 -67 47 -79 16 -8 164 -11 470 -11 352 0 444 -3 440 -12 -2 -7
                    -219 -522 -481 -1144 -262 -622 -476 -1141 -476 -1153 0 -30 52 -81 82 -81 13
                    0 34 7 46 16 21 14 2714 3205 2755 3264 24 35 21 76 -8 105 l-24 25 -522 0
                    c-413 0 -520 3 -516 13 2 6 223 356 489 777 267 421 490 775 496 787 20 36 14
                    82 -13 108 l-24 25 -709 0 c-708 0 -709 0 -736 -21z"/>
                    </g>
                </svg>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="6vmin" height="6vmin" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet" id="f4">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="none" stroke="black" stroke-width="100">
                    <path d="M2426 5099 c-19 -15 -216 -398 -672 -1310 -354 -709 -644 -1298 -644
                    -1309 0 -32 21 -67 47 -79 16 -8 164 -11 470 -11 352 0 444 -3 440 -12 -2 -7
                    -219 -522 -481 -1144 -262 -622 -476 -1141 -476 -1153 0 -30 52 -81 82 -81 13
                    0 34 7 46 16 21 14 2714 3205 2755 3264 24 35 21 76 -8 105 l-24 25 -522 0
                    c-413 0 -520 3 -516 13 2 6 223 356 489 777 267 421 490 775 496 787 20 36 14
                    82 -13 108 l-24 25 -709 0 c-708 0 -709 0 -736 -21z"/>
                </g>
            </svg>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="timer-container">
                    <p class="h2 timer"></p>
                </div>
            </div>
        </div>
        <div class="row col-12">
            <p class="h2 text-lowercase word text-center py-3"></p>
        </div>
        <div class="row col-12">
            <p class="h2 text-lowercase translation text-center py-1"></p>
        </div>
        <div class="row col-12 pt-3 justify-content-center buttons-container">
            <div class="col-6 d-flex justify-content-end">
                <button type="button" class="btn btn-success btn-lg px-5 right">верно</button>
            </div>
            <div class="col-6 d-flex justify-content-start">
                <button type="button" class="btn btn-danger btn-lg px-5 wrong">неверно</button>
            </div>
        </div>
        <div class="row col-12 justify-content-center">
            <div class="col-6 d-flex justify-content-end">
                <p class="h2 arrow-left">&#8592;</p>
            </div>
            <div class="col-6 d-flex justify-content-start">
                <p class="h2 arrow-right">&#8594;</p>
            </div>
        </div>
    </div>
</div>    
`;

const wrongResultItem = `<div class="col-12 d-flex flex-row align-items-baseline result-box-wrong">
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="4vmin" height="4vmin" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <path d="M2855 4943 c-31 -8 -29 -7 -902 -705 l-822 -657 -443 -3 -443 -3 -53 -28 c-70 -37 -128 -97 -161 -166 l-26 -56 0  -765 0 -765 27 -57 c31 -68 95 -133 164 -168 l49 -25 443 -3 443 -3 825 -660 c454 -363 840 -669 857 -679 82 -50 178 -28 230 52 l27 42 0 2266 0 2266 -27 42 c-42 64 -115 93 -188 75z
        m-127 -3312 l-3 -929 -677 542 -678 541 0 775 0 775 678 541 677 542 3 -929 c1 -511 1 -1347 0 -1858z m-1708 929 l0 -680 -340 0 -340 0 0 680 0 680 340 0 340 0 0 -680z"/>
        <path d="M4245 4289 c-88 -28 -139 -136 -105 -224 6 -15 46 -66 89 -114 365 -403 545 -864 545 -1391 0 -527 -180 -988 -545 -1391 -43 -48 -83 -99 -89 -114 -37 -96 25 -209 127 -230 64 -13 112 10 195 95 360 369 599 892 647 1420 63 676 -167 1347 -634 1848 -37 40 -80 79 -95 87 -38 20 -99 26 -135 14z"/>
        <path d="M3778 3810 c-82 -25 -128 -85 -128 -167 0 -56 22 -96 94 -173 464 -490 464 -1330 0 -1820 -72 -77 -94 -117 -94 -173 0 -64 30 -118 83 -148 53 -29 123 -30 169 0 36 23 129 123 199 216 444 589 444 1441 0 2030 -68 91 -162 193 -196 214 -37 23 -91 32 -127 21z"/>
        </g>
    </svg>
    <p class="h4 px-2 word-described"></p>
    <p class="h4 px-1">-</p>
    <p class="h4 px-2 translation"></p>
</div>`;

const rightResultItem = `<div class="col-12 d-flex flex-row align-items-baseline result-box-right">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
width="4vmin" height="4vmin" viewBox="0 0 512.000000 512.000000"
preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M2855 4943 c-31 -8 -29 -7 -902 -705 l-822 -657 -443 -3 -443 -3 -53
-28 c-70 -37 -128 -97 -161 -166 l-26 -56 0 -765 0 -765 27 -57 c31 -68 95
-133 164 -168 l49 -25 443 -3 443 -3 825 -660 c454 -363 840 -669 857 -679 82
-50 178 -28 230 52 l27 42 0 2266 0 2266 -27 42 c-42 64 -115 93 -188 75z
m-127 -3312 l-3 -929 -677 542 -678 541 0 775 0 775 678 541 677 542 3 -929
c1 -511 1 -1347 0 -1858z m-1708 929 l0 -680 -340 0 -340 0 0 680 0 680 340 0
340 0 0 -680z"/>
<path d="M4245 4289 c-88 -28 -139 -136 -105 -224 6 -15 46 -66 89 -114 365
-403 545 -864 545 -1391 0 -527 -180 -988 -545 -1391 -43 -48 -83 -99 -89
-114 -37 -96 25 -209 127 -230 64 -13 112 10 195 95 360 369 599 892 647 1420
63 676 -167 1347 -634 1848 -37 40 -80 79 -95 87 -38 20 -99 26 -135 14z"/>
<path d="M3778 3810 c-82 -25 -128 -85 -128 -167 0 -56 22 -96 94 -173 464
-490 464 -1330 0 -1820 -72 -77 -94 -117 -94 -173 0 -64 30 -118 83 -148 53
-29 123 -30 169 0 36 23 129 123 199 216 444 589 444 1441 0 2030 -68 91 -162
193 -196 214 -37 23 -91 32 -127 21z"/>
</g>
</svg>
<p class="h4 px-2 word-described"></p>
<p class="h4 px-1">-</p>
<p class="h4 px-2 translation"></p>
</div>`;

const baseSprintResultLayout = `<main class="main bg-dark text-white">
<div class="container sprint-game d-flex align-items-center justify-content-center">
    <div class="col-md-7 col-12 bg-midi-results d-flex flex-column align-items-start">
        <button type="button" class="btn-close btn-close-white close-game" aria-label="Close"></button>
        <div class="row col-12">
            <p class="h2 text-uppercase text-center py-3">Результаты</p>
        </div>
        <div class="row col-12">
            <p class="h4 text-uppercase text-center py-1">Вы набрали <span class="result-rank h2 text-decoration-underline"></span> очков</p>
        </div>
        <div class="row col-12 d-flex justify-content-center">
            <div class="row col-11 d-flex">
                <p class="h4 text-left py-3">Я знаю <span class="result-rank-right h4"></span></p>
                <div class="row col-12 d-flex i-know">
                </div>
            </div>
            <div class="row col-11 d-flex i-dont-know">
                <p class="h4 text-left py-3">Я не знаю <span class="result-rank-wrong h4"></span></p>
                <div class="row col-12 d-flex i-dont-know">
                </div>
            </div>
        </div>
        <div class="row col-12 d-flex justify-content-center">
            <div class="row col-6 py-3">
                <button type="button" class="btn btn-secondary back">Вернуться к меню</button> 
            </div>
        </div>
    </div>
</div>    
</main>`;

export {
  baseSprintResultLayout, rightResultItem, wrongResultItem, game, prevGame,
};
