const serviceUrl = "https://api.magicthegathering.io/v1/cards";
const cardsUrl = `${serviceUrl}`;
const cardsSearchUrl = (sercheable) => `${cardsUrl}/?name=${sercheable}`;
const specificCard = `${serviceUrl}/:id`;


export function searchCard(card){

  const searchCardPromise = new Promise((resolve, reject) => {
    return fetch(cardsSearchUrl(card))
      .then(res => res.json())
      .then(cards => resolve(cards))
      .catch(error => reject(error))
  });

  return searchCardPromise
}

export function getSpecificCard(card){

  const CardPromise = new Promise((resolve, reject) => {
    return fetch(specificCard)
      .then(res => res.json())
      .then(cards => resolve(cards))
      .catch(error => reject(error))
  });

  return CardPromise
}
