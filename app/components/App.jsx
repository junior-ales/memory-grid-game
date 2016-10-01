import React from 'react';
import { mapValues, identity, add } from 'lodash/fp';

import Game from './Game';
import ScoreBoard from './ScoreBoard';

const inc = add(1);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: 1,
      totalScore: 0,
      gameLevel: {
        rows: 5,
        columns: 5,
        activeCellsCount: 6
      }
    };
  }

  playAgain(lastGameStatus) {
    const nextLevel = mapValues(lastGameStatus === 'won' ? inc : identity);

    this.setState({
      gameId: inc(this.state.gameId),
      gameLevel: nextLevel(this.state.gameLevel)
    });
  }

  updateScore(points) {
    this.setState({ totalScore: this.state.totalScore + points });
  }

  render() {
    return (
      <div id="content">
        <ScoreBoard score={this.state.totalScore} />
        <Game key={this.state.gameId}
              gameLevel={this.state.gameLevel}
              updateScore={this.updateScore.bind(this)}
              playAgain={this.playAgain.bind(this)} />
      </div>
    );
  }
}

export default App;
