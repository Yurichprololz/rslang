import { createElement } from './utils';
import {
  blurForMail, focusForMail, blurForName,
  focusForName, blurForPassword, focusForPassword,
} from './validate-user-data';
import { createUser, signInUser } from './api/userF';
import { IAuth, IUserObjBody } from './interfaces/usersInterface';
import { headerButtonsHandler } from './parts/home/headerButtonsHandler';

interface Iinputs{
  mailInput: HTMLInputElement
  nameInput: HTMLInputElement
  passwordInput : HTMLInputElement
}

function createAuth():HTMLElement {
  const el = createElement('div', 'modal modal-signin d-block bg-secondary py-5 bg-opacity-75', { tabindex: '-1', role: 'dialog', id: 'modalSignin' });
  el.innerHTML = `
  <div class="modal-dialog" role="document">
  <div class="modal-content rounded-5 shadow">
    <div class="modal-header p-5 pb-4 border-bottom-0">
      <h2 class="fw-bold mb-0">Sign up for free</h2>
      <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body p-5 pt-0">
        <div class="form-floating mb-3">
          <input type="email" class="form-control rounded-4" id="floatingEmail" placeholder="name@example.com">
          <label for="floatingEmail">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control rounded-4" id="floatingInput" placeholder="name">
          <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control rounded-4" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" id="submit-auth" type="submit">Sign up</button>
        <p id="warning" class="text-danger text-center"> </p>
    </div>
  </div>
</div>`;
  listenerForAuth(el);
  return el;
}

function createLoginModal():HTMLElement {
  const el = createElement('div', 'modal modal-signin d-block bg-secondary py-5 bg-opacity-75', { tabindex: '-1', role: 'dialog', id: 'modalSignin' });
  el.innerHTML = `
  <div class="modal-dialog" role="document">
  <div class="modal-content rounded-5 shadow">
    <div class="modal-header p-5 pb-4 border-bottom-0">
      <h2 class="fw-bold mb-0">Login</h2>
      <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body p-5 pt-0">
        <div class="form-floating mb-3">
          <input type="email" class="form-control rounded-4" id="floatingEmail" placeholder="name@example.com">
          <label for="floatingEmail">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control rounded-4" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" id="submit-logon" type="submit">Login</button>
        <p id="warning" class="text-danger text-center"> </p>
    </div>
  </div>
</div>`;
  listenerForLogon(el);
  return el;
}

function generallistenerForModal(el: HTMLElement) {
  const btnClose = el.querySelector('#btn-close') as Element;
  btnClose.addEventListener('click', closeModal);

  const inputs = getInputs(el);
  const { mailInput, passwordInput } = inputs;
  mailInput.addEventListener('blur', blurForMail);
  mailInput.addEventListener('focus', focusForMail);

  passwordInput.addEventListener('blur', blurForPassword);
  passwordInput.addEventListener('focus', focusForPassword);
}

function listenerForLogon(el: HTMLElement): void {
  generallistenerForModal(el);

  const submit = el.querySelector('#submit-logon') as HTMLButtonElement;
  submit.addEventListener('click', submitFromLogon);
}

function listenerForAuth(el: HTMLElement): void {
  generallistenerForModal(el);

  const submit = el.querySelector('#submit-auth') as HTMLButtonElement;
  submit.addEventListener('click', sibmitToSignin);
  const inputs = getInputs(el);
  const { nameInput } = inputs;

  nameInput.addEventListener('blur', blurForName);
  nameInput.addEventListener('focus', focusForName);
}

function closeModal(event:Event): void {
  const target = event.target as HTMLDivElement;
  const model = target.closest('#modalSignin');
  if (model) {
    model.remove();
  }
}

function getInputs(parent:HTMLDivElement | HTMLElement):Iinputs {
  return {
    mailInput: parent.querySelector('#floatingEmail') as HTMLInputElement,
    nameInput: parent.querySelector('#floatingInput') as HTMLInputElement,
    passwordInput: parent.querySelector('#floatingPassword') as HTMLInputElement,
  };
}

async function sibmitToSignin(event:Event): Promise<void> {
  event.preventDefault();
  const target = event.target as HTMLDivElement;
  const model = target.closest('#modalSignin') as HTMLDivElement;
  const inputs = getInputs(model);
  const { mailInput, nameInput, passwordInput } = inputs;

  const mail = mailInput.value;
  const name = nameInput.value;
  const password = passwordInput.value;

  const header = document.querySelector('.header') as HTMLElement;
  const data = await createUser(mail, password, name);
  if (isUsersData(data)) {
    updateHeader(header);
    closeModal(event);
  } else {
    showWarning(data);
  }
}

async function submitFromLogon(event:Event): Promise<void> {
  event.preventDefault();
  const target = event.target as HTMLDivElement;
  const model = target.closest('#modalSignin') as HTMLDivElement;
  const inputs = getInputs(model);
  const { mailInput, passwordInput } = inputs;

  const mail = mailInput.value;
  const password = passwordInput.value;
  const header = document.querySelector('.header') as HTMLElement;
  const data = await signInUser(mail, password);
  if (isUsersData(data)) {
    updateHeader(header);
    closeModal(event);
  } else {
    showWarning(data);
  }
}

function showWarning(errorCode:number):void {
  const warningEl = document.getElementById('warning') as HTMLElement;
  if (errorCode === 417) {
    warningEl.innerHTML = 'Эта почта уже занята';
  } else if (errorCode === 422) {
    warningEl.innerHTML = 'Не корректно ведены почта, имя или пароль';
  } else if (errorCode === 403) {
    warningEl.innerHTML = 'Не корректно ведены почта или пароль';
  }
}

function isUsersData(data:number | IUserObjBody | IAuth):data is IUserObjBody | IAuth {
  return (data as IUserObjBody).email !== undefined || (data as IAuth).name !== undefined;
}

function renderSinginModal():void {
  const model = createAuth();
  document.body.append(model);
}
function renderLoginModal():void {
  const model = createLoginModal();
  document.body.append(model);
}

function getAuthPanel():string {
  if (localStorage.getItem('name')) {
    return `<div class="text-end">
    <span class="m-3">${localStorage.getItem('name')}</span>
  <button id="signout-btn" type="button" class="btn btn-outline-light me-2">Sign out</button>
</div>`;
  }
  return `<div class="text-end">
  <button id="signin-btn" type="button" class="btn btn-outline-light me-2">Login</button>
  <button id="signup-btn" type="button" class="btn btn-warning">Sign-up</button>
</div>`;
}

function updateHeader(element:HTMLElement): HTMLElement {
  const authPanel = getAuthPanel();
  element.innerHTML = `
  <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
            </a>
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" class="nav-link px-2 text-secondary" id="home">Home</a></li>
              <li><a href="#" class="nav-link px-2 text-white" id="dictionary">Электронный учебник</a></li>
              <li><a href="#" class="nav-link px-2 text-white" id="audio-call">Аудиовызов</a></li>
              <li><a href="#" class="nav-link px-2 text-white" id="sprint">Спринт</a></li>
              <li><a href="#" class="nav-link px-2 text-white" id="statistics">Статистика</a></li>
            </ul>
            ${authPanel}
          </div>
        </div>`;
  listenerOnHeader(element);
  headerButtonsHandler(element);
  return element;
}

function clearLocalFromUserData():void {
  if (localStorage.getItem('name')) {
    localStorage.removeItem('name');
  }
  if (localStorage.getItem('rslangToken')) {
    localStorage.removeItem('rslangToken');
  }
  if (localStorage.getItem('rslangRefreshToken')) {
    localStorage.removeItem('rslangRefreshToken');
  }
  if (localStorage.getItem('rslangID')) {
    localStorage.removeItem('rslangID');
  }
}

function signout():void {
  clearLocalFromUserData();
  const header = document.querySelector('.header') as HTMLElement;
  updateHeader(header);
}

function listenerOnHeader(header:HTMLElement):void {
  const signupBtn = header.querySelector('#signup-btn');
  const signinBtn = header.querySelector('#signin-btn');
  if (signupBtn && signinBtn) {
    signupBtn.addEventListener('click', renderSinginModal);
    signinBtn.addEventListener('click', renderLoginModal);
  } else {
    const signoutBtn = header.querySelector('#signout-btn') as HTMLButtonElement;
    signoutBtn.addEventListener('click', signout);
  }
}

export default updateHeader;
