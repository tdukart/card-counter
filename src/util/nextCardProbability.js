import cardRanks from "../data/cardRanks";
import { map, slice, sum } from "lodash";

const nextCardProbability = (cardRank, cardCounts) => {
  if (!cardRank) {
    return 'noCard';
  }
  const cardIndex = cardRanks.indexOf(cardRank);
  if (cardIndex === -1) {
    return 'noCard';
  }
  const cardsLeft = map(cardCounts, count => 4 - count);
  const lowerCards = slice(cardsLeft, 0, cardIndex);
  const higherCards = slice(cardsLeft, cardIndex + 1);
  const lowerCardCounts = sum(lowerCards);
  const higherCardCounts = sum(higherCards);
  if (lowerCardCounts < higherCardCounts) {
    return 'higher';
  } else if (higherCardCounts < lowerCardCounts) {
    return 'lower';
  } else {
    return 'equal';
  }
};

export default nextCardProbability;
