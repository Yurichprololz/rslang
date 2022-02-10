import { createElement } from './utils';
import headerButtonsHandler from './parts/home/headerButtonsHandler';
import { LocalStorageItem } from './classes/lsNavigation';
import updateHeader from './auth';

function createHeader():HTMLElement {
  const header = createElement('header', 'header p-3 bg-dark text-white') as HTMLElement;
  updateHeader(header);
  headerButtonsHandler(header);
  return header;
}

function createFooter():HTMLElement {
  const footer = createElement('footer', 'footer bg-dark') as HTMLElement;
  footer.innerHTML = `
  <div class="container footer__container">
      <div class="footer__rsschool">
          <img src="./assets/images/rs_school.svg" alt="RS school logo">
      </div>
      <div class="footer__developers">
          <a class="text-white footer__developer" href="https://github.com/Yurichprololz" target="_blank">Yuri<img src="./assets/images/GitHub-Mark-32px.png" alt="link for repository"></a>
          <a class="text-white footer__developer" href="https://github.com/sashatsarikova" target="_blank">Sasha<img src="./assets/images/GitHub-Mark-32px.png" alt="link for repository"></a>
      </div>
      <div class="footer__year text-white">2022</div>
</div>`;
  return footer;
}

function createMain():HTMLElement {
  const main = createElement('main', 'main bg-dark text-white pb-5') as HTMLElement;
  main.innerHTML = `
  <div class="container">
    <h1 class="h1 text-white text-center">RSLang</h1>
    <p class="text-white text-center">Используй быстрый и эффективный способ изучения английского языка.
        Все самые лучшие методики в одном месте.</p>
      <h2 class='text-center'>О нас</h2>
      <div class="container text-black d-flex flex-wrap justify-content-around">
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Юрий Таргонский</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="https://github.com/Yurichprololz" target="_blank" class="btn btn-primary">Гитхаб</a>
            </div>
          </div>
        <div class="card" style="width: 18rem;">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Александра Царикова</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="https://github.com/sashatsarikova" target="_blank" class="btn btn-primary">Гитхаб</a>
          </div>
        </div>
  </div>
        </div>`;
  return main;
}

function renderBasicLayout():void {
  const header = createHeader();
  const main = createMain();
  const footer = createFooter();

  document.body.append(header);
  document.body.append(main);
  document.body.append(footer);
  new LocalStorageItem().startStorage();
}

export default renderBasicLayout;
