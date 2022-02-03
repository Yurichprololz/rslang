import DOMAIN from './domain';
import {
  IAuth, IUserObjBody, StorageItems,
} from '../interfaces/usersInterface';
import { General, SubGeneral } from '../interfaces/generalEnum';

async function signInUser(emailParam: string, passwordParam: string) {
  const objBody:IUserObjBody = {
    email: emailParam,
    password: passwordParam,
  };
  const rawResponse = await fetch(`${DOMAIN}${General.signin}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objBody),
  });
  const content: IAuth = await rawResponse.json();
  localStorage.setItem(StorageItems.token, content.token);
  localStorage.setItem(StorageItems.refreshToken, content.refreshToken);
  localStorage.setItem(StorageItems.id, content.userId);
  // console.log(content.token);
  return content;
}

async function createUser(emailParam: string, passwordParam: string, nameParam:string) {
  const objBody:IUserObjBody = {
    email: emailParam,
    password: passwordParam,
    name: nameParam,
  };
  const rawResponse = await fetch(`${DOMAIN}${General.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objBody),
  });
  const content: IUserObjBody = await rawResponse.json();
  signInUser(emailParam, passwordParam);
  return content;
}

async function getUser() {
  const rawResponse: Response = await fetch(`${DOMAIN}${General.users}/${localStorage.getItem(StorageItems.id)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const content: IUserObjBody = await rawResponse.json();
  return content;
}

async function updateUser(emailParam: string, passwordParam: string) {
  const objBody:IUserObjBody = {
    email: emailParam,
    password: passwordParam,
  };
  const rawResponse = await fetch(`${DOMAIN}${General.users}/${localStorage.getItem(StorageItems.id)}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objBody),
  });
  const content: IUserObjBody = await rawResponse.json();
  return content;
}

async function deleteUser(): Promise<void> {
  if (localStorage.getItem(StorageItems.id)) {
    await fetch(`${DOMAIN}${General.users}/${localStorage.getItem(StorageItems.id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    localStorage.removeItem(StorageItems.id);
    localStorage.removeItem(StorageItems.token);
    localStorage.removeItem(StorageItems.refreshToken);
  }
}

async function refreshToken():Promise<void> {
  const rawResponse: Response = await fetch(`${DOMAIN}${General.users}/${localStorage.getItem(StorageItems.id)}${SubGeneral.tokens}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.refreshToken)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const content: IAuth = await rawResponse.json();
  localStorage.setItem(StorageItems.token, content.token);
  localStorage.setItem(StorageItems.refreshToken, content.refreshToken);
}

export {
  createUser, getUser, signInUser, updateUser, deleteUser, refreshToken,
};
