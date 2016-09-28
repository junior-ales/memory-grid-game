import React from 'react';

class Footer extends React.Component {
  remainingCount() {
    let remainingCountEl = (
      <div className="remaining-count">
        {this.props.activeCellsCount - this.props.correctGuesses.length}
      </div>
    );

    if (this.props.gameState === 'recall') return remainingCountEl;
  }

  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]}
        </div>
        {this.remainingCount()}
      </div>
    );
  }
}

Footer.defaultProps = {
  hints: {
    ready: 'Get Ready',
    memorize: 'Memorize',
    recall: 'Recall',
    won: 'Well Played',
    lost: 'Game Over'
  }
};

export default Footer;

