import React from 'react';
import { Progress } from 'reactstrap';
import styles from "./Deck.module.css";
import cardRanks from "../data/cardRanks";
import Card from "./Card";
import nextCardProbability from "../util/nextCardProbability";
import deckAverage from "../util/deckAverage";

const probabilitySentences = {
  higher: 'The next card is probably higher.',
  lower: 'The next card is probably lower.',
  equal: 'The next card has an equal chance of being higher or lower.',
  noCard: '',
};

const Deck = ({ active, lastCard, cardCounts, onCardClick }) => {
  const probability = nextCardProbability(lastCard, cardCounts);
  const average = deckAverage(cardCounts);

  return (
    <div className={active ? styles.activeDeck : styles.inactiveDeck}>
      <div className={styles.cardContainer}>
        {cardRanks.map((rank, index) => (
          <Card
            key={rank}
            rank={rank}
            highlight={rank === lastCard}
            count={cardCounts[index]}
            onClick={() => onCardClick(rank)}
          />
        ))}
      </div>
      <Progress value={average} max={12} />
      <p>{probabilitySentences[probability]}</p>
    </div>
  );
}

export default Deck;
