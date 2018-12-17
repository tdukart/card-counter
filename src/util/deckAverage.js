import { map, reduce, sum } from 'lodash';

const deckAverage = cardCounts => {
  const cardsLeft = map(cardCounts, count => 4 - count);
  const total = reduce(cardsLeft, (result, count, index) => result + (count * index), 0);
  return total / (sum(cardsLeft));
};

export default deckAverage;
