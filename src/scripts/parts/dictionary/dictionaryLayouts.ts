const chpterLayout = ` 
<div class="container dictionary py-3">
    <h2 class="text-center text-white pb-2">... Выбери уровень сложности ...</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4 chapter-cards">    
    </div>
</div>
`;

const chapterItem = `
<div class="card">
    <div class="card-body">
    <h3 class="card-title text-center"></h3>
    <p class="card-text special-text"></p>
    </div>
    <div class="card-footer">
        <small class="text-muted">Изучи эту категорию</small>
    </div>
</div>`;

function wordListItemFn(num: number) {
  return `<h2 class="accordion-header" id="pHeading-${num}">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pCollapse-${num}" aria-expanded="false" aria-controls="pCollapse-${num}">
      <p class="h6 text-uppercase word-described px-1"></p>  
      <span class="badge bg-warning rounded-pill px-1.5 mx-3 hard-mark display-none">С</span>
      <span class="badge bg-success rounded-pill px-1.5 mx-2 text-uppercase learned-mark display-none">И</span>
    </button>
  </h2>
  <div id="pCollapse-${num}" class="accordion-collapse collapse" aria-labelledby="pHeading-${num}">
    <div class="accordion-body">
      <div class="row">
        <p class="h6 px-1"> - <small class="text-muted word-transcription"></small> - <span class="h6 text-uppercase px-1 word-translation text-dark"> </span> </p> 
      </div>
      <div class="row">
        <div class="col-md-4">
          <figure class="figure" >
            <img class="figure-img img-fluid rounded-circle" alt="...">
            <figcaption class="figure-caption text-end"><button class="btn btn-outline-dark voluem-button">
              Послушаешь? &#9658;
            </button></figcaption>
          </figure>
        </div>
        <div class="col-md-8">
          <div class="row">
            <dt class="col-sm-3 text-dark">Meaning / значение</dt>
              <dd class="col-sm-9">
                <p class="meaning text-dark">aa</p>
                <p class="meaning-translation text-dark"></p>
              </dd>
            <dt class="col-sm-3 text-dark">Example / пример</dt>
            <dd class="col-sm-9">
              <p class="example text-dark"></p>
              <p class="example-translation text-dark"></p>
            </dd>
          </div>
          <div class="row display-none">
            <div class="form-check form-switch col-4">
              <input class="form-check-input input-difficulty" type="checkbox" id="difficulty-chB-${num}">
              <label class="form-check-label h6 text-warning" for="difficulty-chB-${num}">Я сложное?</label>
            </div>
            <div class="form-check form-switch col-4">
              <input class="form-check-input input-learned" type="checkbox" id="learned-chB-${num}">
              <label class="form-check-label h6 text-success " for="learned-chB-${num}">Я уже изучено?</label>
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-outline-danger delete-button">&#128465;</button>
            </div>
          </div>
          <div class="row display-none">
            <div class="col-6">
              <p class="h6 px-1"><small class="text-muted">Правильных попыток: </small> <span class="h6 text-uppercase text-success px-1 right-answer"> 0 </span> </p> 
            </div>
            <div class="col-6">
              <p class="h6 px-1"> <small class="text-muted">Неправильных попыток: </small> <span class="h6 text-uppercase text-danger px-1 wrong-answer"> 0 </span></p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

const wordList = `<div class="container py-3 wordlist">
<h2 class="text-center text-white pb-3">... Словарик ...</h2>
<div class="row col-12 g-6 justify-content-center">
  <div class="btn-toolbar justify-content-center my-2" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group mr-2" role="group" aria-label="First group">
      <button type="button" class="btn btn-outline-secondary WP-btn-prev">&#9668;</button>
    </div>
    <div class="input-group flex-nowrap">
      <input type="text" class="form-control page-number" style="max-width: 70px;" placeholder="1" aria-label="Username" aria-describedby="page-number">
      <span class="input-group-text" id="page-number">/ 30</span>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="First group">
      <button type="button" class="btn btn-outline-secondary WP-btn-next">&#9658;</button>
    </div>
  </div>
    <div class="accordion col-xl-8 col-md-12" id="accordionPanel">
    </div>
</div>
</div>`;

export {
  chpterLayout, chapterItem, wordList, wordListItemFn,
};
