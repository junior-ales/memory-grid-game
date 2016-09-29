import React from 'react';
import { range, flatten, sampleSize } from 'lodash';

import Cell from './Cell';
import Row from './Row';
import Footer from './Footer';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.matrix = range(props.rows).map(rowId => {
      return range(props.columns).map(colId => `${rowId}${colId}`);
    });

    this.activeCells = sampleSize(flatten(this.matrix), props.activeCellsCount);

    this.state = {
      gameState: 'ready',
      correctGuesses: [],
      wrongGuesses: []
    };
  }

  componentDidMount() {
    this.memorizeTimerId = setTimeout(() => {
      this.setState({ gameState: 'memorize' }, () => {
        this.recallTimerId = setTimeout(() => {
          this.setState({ gameState: 'recall' }, () => {
            this.gameLimitTimerId = setTimeout(() => {
              if (this.state.gameState === 'recall') {
                this.setState({ gameState: 'lost' });
              }
            }, this.props.gameDurationInSecs * 1000);
          });
        }, 2000);
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.memorizeTimerId);
    clearTimeout(this.recallTimerId);
    clearTimeout(this.gameLimitTimerId);
  }

  recordGuess({cellId, userGuessIsCorrect}) {
    let { correctGuesses, wrongGuesses, gameState } = this.state;

    userGuessIsCorrect ? correctGuesses.push(cellId) : wrongGuesses.push(cellId);

    if (correctGuesses.length === this.props.activeCellsCount) {
      gameState = 'won';

      if (wrongGuesses.length === 0) this.props.updateScore(3);
      else if (wrongGuesses.length === 1) this.props.updateScore(2);
      else this.props.updateScore(1);
    }

    if (wrongGuesses.length > this.props.allowedWrongAttempts) { gameState = 'lost'; }

    this.setState({ correctGuesses, wrongGuesses, gameState });
  }

  render() {
    let showActiveCells = ['memorize', 'lost'].indexOf(this.state.gameState) > -1;

    return (
      <div className="grid">
        {this.matrix.map((row, ri) => (
          <Row key={ri}>
            {row.map(cellId =>
              <Cell key={cellId} id={cellId}
                    activeCells={this.activeCells}
                    showActiveCells={showActiveCells}
                    recordGuess={this.recordGuess.bind(this)}
                    correctGuesses={this.state.correctGuesses}
                    wrongGuesses={this.state.wrongGuesses}
                    gameState={this.state.gameState} />
            )}
          </Row>
        ))}
        <Footer gameState={this.state.gameState}
                playAgain={this.props.createNewGame}
                correctGuesses={this.state.correctGuesses}
                activeCellsCount={this.props.activeCellsCount} />
      </div>
    );
  }
}

Game.defaultProps = {
  allowedWrongAttempts: 2,
  rows: 5,
  columns: 5,
  activeCellsCount: 6,
  gameDurationInSecs: 10
};

export default Game;
