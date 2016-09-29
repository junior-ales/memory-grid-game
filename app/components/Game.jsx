import React from 'react';
import { flatten, sampleSize } from 'lodash';

import Cell from './Cell';
import Row from './Row';
import Footer from './Footer';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.matrix = [];
    let row;

    for (let r = 0; r < this.props.rows; r++) {
      row = [];
      for (let c = 0; c < this.props.columns; c++) {
        row.push(`${r}${c}`);
      }

      this.matrix.push(row);
    }

    this.activeCells = sampleSize(flatten(this.matrix), this.props.activeCellsCount);

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
            }, 10000);
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
    if (correctGuesses.length === this.props.activeCellsCount) { gameState = 'won'; }
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
  allowedWrongAttempts: 2
};

export default Game;
