function isValidateUserDate(
  mailInput:HTMLInputElement,
  passwordInput:HTMLInputElement,
  nameInput?:HTMLInputElement,
):boolean {
  if (nameInput) {
    return isValidateUserMail(mailInput)
    && isValidateUserName(nameInput)
    && isValidateUserPassword(passwordInput);
  }
  return isValidateUserMail(mailInput)
    && isValidateUserPassword(passwordInput);
}
function isValidateUserMail(mailInput:HTMLInputElement):boolean {
  const mail = mailInput.value;
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return reg.test(mail);
}
function isValidateUserName(nameInput:HTMLInputElement):boolean {
  const name = nameInput.value;
  return name.length >= 4;
}
function isValidateUserPassword(passwordInput:HTMLInputElement):boolean {
  const password = passwordInput.value;
  return password.length >= 8;
}

function blurForMail(event:Event): void {
  const target = event.target as HTMLInputElement;
  if (!isValidateUserMail(target)) {
    target.classList.add('border-danger');
    const label = target.nextElementSibling as HTMLLabelElement;
    label.innerHTML = 'example@mail.com';
  }
}
function blurForName(event:Event): void {
  const target = event.target as HTMLInputElement;
  if (!isValidateUserName(target)) {
    target.classList.add('border-danger');
    const label = target.nextElementSibling as HTMLLabelElement;
    label.innerHTML = 'Имя должно содеражать минимум 4 буквы';
  }
}
function blurForPassword(event:Event): void {
  const target = event.target as HTMLInputElement;
  if (!isValidateUserPassword(target)) {
    target.classList.add('border-danger');
    const label = target.nextElementSibling as HTMLLabelElement;
    label.innerHTML = 'Пароль должен содеражать минимум 8 символов';
  }
}

function cleanWarningMessage(event:Event):void {
  const target = event.target as HTMLDivElement;
  const modal = target.closest('.modal');
  if (modal) {
    const warning = modal.querySelector('#warning') as HTMLParagraphElement;
    warning.textContent = ' ';
  }
}

function focusForMail(event:Event): void {
  cleanWarningMessage(event);
  const target = event.target as HTMLInputElement;
  if (target.classList.contains('border-danger')) {
    const label = target.nextElementSibling as HTMLLabelElement;
    label.innerHTML = 'Email adress';
    target.classList.remove('border-danger');
  }
}
function focusForName(event:Event): void {
  cleanWarningMessage(event);
  const target = event.target as HTMLInputElement;
  if (target.classList.contains('border-danger')) {
    const label = target.nextElementSibling as HTMLLabelElement;
    label.innerHTML = 'Name';
    target.classList.remove('border-danger');
  }
}

function focusForPassword(event:Event): void {
  cleanWarningMessage(event);
  const target = event.target as HTMLInputElement;
  if (target.classList.contains('border-danger')) {
    const label = target.nextElementSibling as HTMLLabelElement;
    label.innerHTML = 'Password';
    target.classList.remove('border-danger');
  }
}

export {
  isValidateUserDate, blurForMail, focusForMail, blurForName,
  focusForName, blurForPassword, focusForPassword,
};
