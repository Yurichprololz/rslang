interface TheObject {
  [key: string]: string;
}

function createElement<T>(tag: T, classList?: T, atr?: TheObject): HTMLElement {
  const el = document.createElement(`${tag}`);
  if (classList) {
    el.className = `${classList}`;
  }
  if (atr) {
    const keys = Object.keys(atr);
    keys.forEach((k) => {
      el.setAttribute(`${k}`, `${atr[k]}`);
    });
  }
  return el;
}

const clearElement = (element: HTMLElement):void => {
  const child = Array.from(element.childNodes);
  child.forEach((elem) => {
    elem.remove();
  });
};

const getFullMain = () => {
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  if (main) {
    main.classList.add('main_full');
  }

  if (footer) {
    footer.style.display = 'none';
  }

  if (header) {
    header.style.display = 'none';
  }
};

const getStandartMain = () => {
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  if (main) {
    if (main.classList.contains('main_full')) {
      main.classList.remove('main_full');
    }
  }

  if (footer) {
    footer.style.display = 'block';
  }
  if (header) {
    header.style.display = 'block';
  }
};

export {
  createElement, clearElement, getFullMain, getStandartMain,
};
