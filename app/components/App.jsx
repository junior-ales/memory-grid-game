import React from 'react';
import Game from './Game';
import ScoreBoard from './ScoreBoard';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: 1,
      totalScore: 0
    };
  }

  createNewGame() {
    this.setState({ gameId: this.state.gameId + 1 });
  }

  updateScore(points) {
    this.setState({ totalScore: this.state.totalScore + points });
  }

  render() {
    return (
      <div id="content">
        <ScoreBoard score={this.state.totalScore} />
        <Game key={this.state.gameId}
              updateScore={this.updateScore.bind(this)}
              createNewGame={this.createNewGame.bind(this)} />
      </div>
    );
  }
}

export default App;
