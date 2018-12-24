import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';
import Mousetrap from 'mousetrap';
import produce from 'immer';
import { clamp, isNumber } from 'lodash';

import cardRanks from './data/cardRanks';
import Deck from './components/Deck';

class App extends Component {
  state = {
    decks: [
      {
        cardCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lastCard: '',
      },
      {
        cardCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lastCard: '',
      },
    ],
    activeDeck: 0,
  };

  incrementCount = (rank, deck = null) => {
    this.setState(produce(draft => {
      const index = cardRanks.indexOf(rank);
      if (!index) return;
      const activeDeck = isNumber(deck) ? deck : draft.activeDeck;
      draft.decks[activeDeck].cardCounts[index] = clamp(draft.decks[activeDeck].cardCounts[index] + 1, 0, 4);
      draft.decks[activeDeck].lastCard = rank;
    }));
  };

  componentDidMount() {
    cardRanks.forEach((rank) => {
      Mousetrap.bind(rank.substr(-1, 1).toLowerCase(), () => this.incrementCount(rank))
    });

    Mousetrap.bind('s', () => {
      this.setState(produce(draft => {
        draft.activeDeck = (draft.activeDeck + 1) % (draft.decks.length)
      }));
    });

    Mousetrap.bind('r', () => {
      this.setState({
        decks: [
          {
            cardCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            lastCard: '',
          },
          {
            cardCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            lastCard: '',
          },
        ],
        activeDeck: 0,
      })
    })
  }

  render() {
    const { activeDeck, decks } = this.state;
    return (
      <div>
        <AppNavbar />
        <Container>
          {decks.map(({ cardCounts, lastCard }, index) => (
            <Deck
              key={index}
              cardCounts={cardCounts}
              lastCard={lastCard}
              active={index === activeDeck}
              onCardClick={(rank) => this.incrementCount(rank, index)}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default App;
