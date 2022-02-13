const prevGame = `<main class="main bg-dark text-white">
<div class=" container sprint-game d-flex align-items-center justify-content-center">
    <div class="col-8  bg-midi-dack h-50 d-flex flex-column align-items-center justify-content-center">
        <p class="h1">Приготовьтесь:</p>
        <div class="count-container">
            <p class="h2 three-to-one">3</p>
        </div>
    </div>
</div>    
</main>`;

const game = ` <main class="main bg-dark text-white">
<div class=" container sprint-game d-flex align-items-center justify-content-center">
    <div class="col-8 bg-midi-dack d-flex flex-column align-items-start">
        <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        <div class="row col-12 sensors-row align-items-center">
            <div class="col-4 text-center">
                <p class="h2 px-1 ranking"></p> 
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
        <div class="row col-12 pt-3 justify-content-center">
            <div class="col-6 d-flex justify-content-end">
                <button type="button" class="btn btn-danger btn-lg px-5 right">верно</button>
            </div>
            <div class="col-6 d-flex justify-content-start">
                <button type="button" class="btn btn-success btn-lg px-5 wrong">неверно</button>
            </div>
        </div>
        <div class="row col-12 justify-content-center">
            <div class="col-6 d-flex justify-content-end">
                <p class="h2">&#8592;</p>
            </div>
            <div class="col-6 d-flex justify-content-start">
                <p class="h2">&#8594;</p>
            </div>
        </div>
    </div>
</div>    
</main>`;

