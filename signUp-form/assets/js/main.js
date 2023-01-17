
const forms = document.forms['free-trial'];
const submitBtn = document.forms['free-trial'].elements['send'];

submitBtn.addEventListener('click', () => {
  const data = {
    firstName: validateFirstName(),
    lastName: validateLastName(),
    email: validateEmail(),
    password: validatePassword()
  }

});


function validateFirstName() {
  const firstName = forms.elements['first-name'].value;
  const errorIcon = document.querySelector('.first-name');
  const errorName = document.getElementById('error_first-name');

  if (firstName.length < 3) {
    errorIcon?.classList?.add('field--has-error');
    errorName?.classList?.add('form--has-error');
    return undefined;

  } else {
    errorIcon?.classList?.remove('field--has-error');
    errorName?.classList?.remove('form--has-error');
    return firstName;
  }
}

function validateLastName() {
  const lastName = forms.elements['last-name'].value;
  const errorIcon = document.querySelector('.last-name');
  const errorName = document.getElementById('error_last-name');

  if (lastName.length < 3) {
    errorIcon?.classList?.add('field--has-error');
    errorName?.classList?.add('form--has-error');
    return undefined;

  } else {
    errorIcon?.classList?.remove('field--has-error');
    errorName?.classList?.remove('form--has-error');
    return lastName;
  }
}

function validateEmail() {
  const email = forms.elements['email'].value;
  const errorIcon = document.querySelector('.email');
  const errorName = document.getElementById('error_email');

  if (!testEmailRegex(email)) {
    errorIcon?.classList?.add('field--has-error');
    errorName?.classList?.add('form--has-error');
    return undefined;

  } else {
    errorIcon?.classList?.remove('field--has-error');
    errorName?.classList?.remove('form--has-error');
    return email;
  }
}

function testEmailRegex(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return re.test(email);
}

function validatePassword() {
  const pwd = forms.elements['password'].value;
  const errorIcon = document.querySelector('.password');
  const errorName = document.getElementById('error_password');

  if (pwd.length < 6) {
    errorIcon?.classList?.add('field--has-error');
    errorName?.classList?.add('form--has-error');
    return undefined;

  } else {
    errorIcon?.classList?.remove('field--has-error');
    errorName?.classList?.remove('form--has-error');
    return pwd;
  }
}