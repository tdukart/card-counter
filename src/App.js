import React, { Component } from 'react';
import AppNavbar from "./components/AppNavbar";
import { Container } from "reactstrap";
import Mousetrap from 'mousetrap';
import produce from 'immer';
import { clamp } from 'lodash';

import cardRanks from './data/cardRanks';
import Deck from "./components/Deck";

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

  componentDidMount() {
    cardRanks.forEach((rank, index) => {
      Mousetrap.bind(rank.substr(-1, 1).toLowerCase(), () => {
        this.setState(produce(draft => {
          draft.decks[draft.activeDeck].cardCounts[index] = clamp(draft.decks[draft.activeDeck].cardCounts[index] + 1, 0, 4);
          draft.decks[draft.activeDeck].lastCard = rank;
        }));
      })
    });

    Mousetrap.bind('s', () => {
      this.setState(produce(draft => {
        draft.activeDeck = (draft.activeDeck + 1) % (draft.decks.length)
      }));
    })

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
            <Deck key={index} cardCounts={cardCounts} lastCard={lastCard} active={index === activeDeck} />
          ))}
        </Container>
      </div>
    );
  }
}

export default App;
