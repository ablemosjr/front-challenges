
const submitBtn = document.querySelector('#submit');
const n_options = document.querySelector('#options').children.length;
const option = document.querySelectorAll('.option');
let feedback = 0;

for (let i = 0; i < n_options; i++) {
  option[i].addEventListener('click', () => {
    
    option.forEach((opt) => {
      opt.classList.contains('--is-selected');
      opt.classList.remove('--is-selected');
    })

    option[i].classList.add('--is-selected');
    feedback = option[i].value;
  });

  submitBtn.addEventListener('click', function(e) {  
    show_submittedState(feedback);
  });
}

function show_submittedState(feedback) {
  return document.body.innerHTML =
  `
  <main class="submitted_state">
    <img src="assets/images/illustration-thank-you.svg" alt="Illustration Thank You - Submitted state">

    <div>
      <p>You selected ${feedback} out of 5</p>
    </div>

    <h1>Thank You!</h1>
    <p>We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
  </main>
  `;
}