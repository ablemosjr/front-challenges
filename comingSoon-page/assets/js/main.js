
const inputEmail = document.getElementById('inputEmail');
const btnSendEmail = document.getElementById('sendEmail');
const email_error = document.getElementById('email_error');

btnSendEmail.addEventListener('click', () => {
  const email = inputEmail.value;

  if (!validateEmail(email)) {
    email_error.innerHTML = 'Please provide a valid email';
    email_error.classList.add('--has-error');
    btnSendEmail.classList.add('--has-error');
    
  } else {
    email_error.classList.remove('--has-error');
    btnSendEmail.classList.remove('--has-error');
  }
});

function validateEmail(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email);
}