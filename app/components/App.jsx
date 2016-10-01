import React from 'react';
import { toPairs, fromPairs, map, compose, identity } from 'lodash/fp';

import Game from './Game';
import ScoreBoard from './ScoreBoard';

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
    const transformFn = lastGameStatus === 'won' ? map(([k, v]) => [k, v+1]) : identity;
    const nextLevel = compose(fromPairs, transformFn, toPairs);
    const gameLevel = nextLevel(this.state.gameLevel);

    this.setState({ gameId: this.state.gameId + 1, gameLevel });
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
