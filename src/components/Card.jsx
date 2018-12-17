import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ rank, highlight, count }) => {

  const lights = [1, 2, 3, 4].map(lightIndex => (
    <div
      key={`light-${lightIndex}`}
      className={lightIndex <= count ? styles.counterLightLit : styles.counterLightDark}
    />
  ));


  return (
    <div className={styles.card + ' ' + (highlight ? styles.lastCard : '')}>
      <p className={styles.rank}>{rank}</p>
      <div className={styles.cardCounter}>
        {lights}
      </div>
    </div>
  );
};

Card.propTypes = {
  highlight: PropTypes.bool,
  rank: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

Card.defaultProps = {
  highlight: false,
}

export default Card;
