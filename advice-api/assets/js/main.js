
class Advice {
  id;
  description;
}

const AdviceApi = {}

 AdviceApi.generate = () => {
  const url = `https://api.adviceslip.com/advice`;

  return fetch(url)
    .then(response => response.json())
    .then((adviceDetail) => {
      const adv = new Advice();
      adv.id = adviceDetail.slip.id;
      adv.description = adviceDetail.slip.advice;
      return adv;
    })
    .catch(err => console.error(err));
}

AdviceApi.printer = () => {
  AdviceApi.generate().then((advice) => {
    const newHtml = `
    <h1 class="card__title">Advice &nbsp#<span>${advice.id}</span></h1>

    <p class="card__quotation">"${advice.description}"</p>
    
    <div class="card__button">
      <button id="btn-generate">
        <img src="/assets/images/icon-dice.svg" alt="Dice button">
      </button>
    </div>
    `;

    const adviceCard = document.querySelector('#advice-card')
    adviceCard.innerHTML = newHtml;

    const btnGenerate = document.querySelector('#btn-generate');
    btnGenerate.addEventListener('click', () => {
      AdviceApi.printer();
    });
  });
}

AdviceApi.printer();